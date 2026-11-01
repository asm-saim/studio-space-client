import { Suspense } from "react";
import type { Metadata } from "next";
import { PageContainer } from "@/components/shared/page-container";
import { StudioForm } from "@/components/studios/studio-form";
import { requireUser } from "@/lib/session";


export const metadata: Metadata = { title: "Add a studio" };

async function AddStudioContent() {
  const user = await requireUser("/add-studio");
  return <StudioForm mode="create" host={{ name: user.name, email: user.email }} />;
}

export default function AddStudioPage() {
  return (
    <PageContainer narrow title="Add a new studio" description="Share your space with creators. You can edit or remove it any time from My Listings.">
      <Suspense fallback={<div aria-hidden="true" className="h-[40rem] animate-pulse rounded-2xl bg-muted" />}>
        <AddStudioContent />
      </Suspense>
    </PageContainer>
  );
}