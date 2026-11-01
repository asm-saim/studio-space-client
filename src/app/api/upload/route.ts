import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

const MAX_BYTES = 5 * 1024 * 1024;

// POST multipart/form-data { file }  ->  { url }
// Logged-in users only. The imgbb key stays on the server.
export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) {
    return NextResponse.json({ message: "Please log in to upload images." }, { status: 401 });
  }

  const key = process.env.IMGBB_API_KEY;
  if (!key) {
    return NextResponse.json({ message: "Image upload isn't configured yet." }, { status: 500 });
  }

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File) || !file.type.startsWith("image/")) {
    return NextResponse.json({ message: "Choose an image file." }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ message: "Images must be 5 MB or smaller." }, { status: 400 });
  }

  const body = new FormData();
  body.append("image", file);

  const res = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, { method: "POST", body });
  const data = await res.json().catch(() => null);
  if (!res.ok || !data?.data?.url) {
    return NextResponse.json({ message: "Image upload failed. Please try again." }, { status: 502 });
  }

  return NextResponse.json({ url: data.data.url as string });
}