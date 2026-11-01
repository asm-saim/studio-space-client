import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageContainer } from "@/components/shared/page-container";
import { StudioForm } from "@/components/studios/studio-form";
import { requireUser } from "@/lib/session";
import { getStudio } from "@/lib/studios";

export const metadata: Metadata = { title: "Update studio" };

async function EditStudioContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await requireUser(`/studios/edit/${id}`);
  const studio = await getStudio(id);
  // Same response for "missing" and "not yours" so listings can't be probed.
  if (!studio || studio.ownerEmail !== user.email) notFound();

  return <StudioForm mode="edit" studioId={studio.id} initial={studio} host={{ name: studio.ownerName, email: studio.ownerEmail }} />;
}

export default function EditStudioPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <PageContainer narrow title="Update studio" description="Change your listing details. Host information can't be edited.">
      <Suspense fallback={<div aria-hidden="true" className="h-[40rem] animate-pulse rounded-2xl bg-muted" />}>
        <EditStudioContent params={params} />
      </Suspense>
    </PageContainer>
  );
}