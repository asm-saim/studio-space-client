import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Building2, CalendarDays, CheckCircle2, CloudOff, Inbox, Plus, Search, Wallet } from "lucide-react";
import { EmptyState } from "@/components/shared/empty-state";
import { PageContainer } from "@/components/shared/page-container";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { formatMoney, initialsOf } from "@/lib/format";
import { getBookingRequests, getMyBookings, getMyStudios } from "@/lib/private-data";
import { requireUser, type SessionUser } from "@/lib/session";
import { cn } from "@/lib/utils";
import { StatCard, StatCardProps } from "./stat-card";
import { DashboardOnboarding } from "./onboarding";
import { DashboardPanel, PanelError } from "./dashboard-panel";
import { RecentRequests } from "./recent-requests";
import { RecentBookings } from "./recent-bookings";
import { DashboardSkeleton } from "./dashboard-skeleton";

export const metadata: Metadata = { title: "Dashboard" };

/** Resolves to null (and logs) instead of throwing, so one failed request can't blank the page. */
async function settle<T>(promise: Promise<T>): Promise<T | null> {
  try {
    return await promise;
  } catch (error) {
    console.error("Dashboard data failed to load", error);
    return null;
  }
}

function Welcome({ user, subtitle }: { user: SessionUser; subtitle: string }) {
  const firstName = user.name.trim().split(/\s+/)[0] || "there";

  return (
    <section
      aria-labelledby="welcome-heading"
      className="flex flex-col gap-6 rounded-3xl border bg-gradient-to-br from-primary/10 via-card to-card p-6 sm:p-8 md:flex-row md:items-center md:justify-between"
    >
      <div className="flex min-w-0 items-center gap-4 sm:gap-5">
        <Avatar className="size-16 sm:size-20">
          <AvatarImage src={user.image} alt="" referrerPolicy="no-referrer" />
          <AvatarFallback className="text-xl">{initialsOf(user.name)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <h1 id="welcome-heading" className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
            Welcome back, {firstName}
          </h1>
          <p className="mt-1 text-muted-foreground">{subtitle}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button size="lg" className="h-11" nativeButton={false} render={<Link href="/add-studio" />}>
          <Plus aria-hidden="true" />
          Add New Studio
        </Button>
        <Button size="lg" variant="outline" className="h-11" nativeButton={false} render={<Link href="/studios" />}>
          <Search aria-hidden="true" />
          Explore Studios
        </Button>
      </div>
    </section>
  );
}

async function DashboardContent() {
  const user = await requireUser("/dashboard");

  // The three requests are independent, so they run in parallel.
  const [studios, bookings, requests] = await Promise.all([
    settle(getMyStudios(user)),
    settle(getMyBookings(user)),
    settle(getBookingRequests(user)),
  ]);

  if (!studios && !bookings && !requests) {
    return (
      <div className="space-y-8">
        <Welcome user={user} subtitle="Here's your StudioSpace overview." />
        <EmptyState icon={CloudOff} title="We couldn't load your dashboard" description="Something went wrong on our side. Please try again in a moment.">
          <Button nativeButton={false} render={<Link href="/dashboard" />}>
            Try again
          </Button>
        </EmptyState>
      </div>
    );
  }

  const studioCount = studios?.length ?? 0;
  const bookingCount = bookings?.length ?? 0;
  const requestList = requests ?? [];
  const isHost = studioCount > 0 || requestList.length > 0;
  const isNewUser = studios !== null && bookings !== null && studioCount === 0 && bookingCount === 0;

  const pendingRequests = requestList.filter((r) => r.status === "Pending").length;
  const confirmedRequests = requestList.filter((r) => r.status === "Confirmed").length;
  const completedRequests = requestList.filter((r) => r.status === "Completed");
  const earnings = completedRequests.reduce((sum, r) => sum + r.totalPrice, 0);
  const pendingBookings = (bookings ?? []).filter((b) => b.status === "Pending").length;

  const subtitle =
    pendingRequests > 0
      ? `You have ${pendingRequests} booking ${pendingRequests === 1 ? "request" : "requests"} waiting for your reply.`
      : isNewUser
        ? "Let's get you started on StudioSpace."
        : "Here's a snapshot of your studios and bookings.";

  // Only real, user-specific numbers. Cards with nothing to say are left out.
  const stats: StatCardProps[] = [];
  if (studioCount > 0) {
    stats.push({
      href: "/my-listings",
      label: "My Studios",
      value: studioCount,
      hint: studioCount === 1 ? "listing on StudioSpace" : "listings on StudioSpace",
      icon: Building2,
      tone: "primary",
    });
  }
  if (isHost && requests) {
    stats.push({
      href: "/booking-requests",
      label: "Booking Requests",
      value: pendingRequests,
      hint: pendingRequests > 0 ? "awaiting your reply" : "You're all caught up",
      icon: Inbox,
      tone: pendingRequests > 0 ? "primary" : "neutral",
      highlight: pendingRequests > 0,
    });
  }
  if (bookingCount > 0) {
    stats.push({
      href: "/my-bookings",
      label: "My Bookings",
      value: bookingCount,
      hint: pendingBookings > 0 ? `${pendingBookings} pending` : "reservations you've made",
      icon: CalendarDays,
      tone: "neutral",
    });
  }
  // Earnings only come from bookings marked Completed. If there are none yet, show
  // Confirmed bookings instead of a misleading "$0".
  if (completedRequests.length > 0) {
    stats.push({
      href: "/booking-requests",
      label: "Earnings",
      value: formatMoney(earnings),
      hint: `from ${completedRequests.length} completed ${completedRequests.length === 1 ? "booking" : "bookings"}`,
      icon: Wallet,
      tone: "muted",
    });
  } else if (confirmedRequests > 0) {
    stats.push({
      href: "/booking-requests",
      label: "Confirmed Bookings",
      value: confirmedRequests,
      hint: "reserved at your studios",
      icon: CheckCircle2,
      tone: "muted",
    });
  }

  const showRequestsPanel = isHost;
  const showBookingsPanel = bookingCount > 0 || bookings === null;
  const panelCount = Number(showRequestsPanel) + Number(showBookingsPanel);

  return (
    <div className="space-y-8">
      <Welcome user={user} subtitle={subtitle} />

      {isNewUser ? (
        <DashboardOnboarding />
      ) : (
        <>
          {stats.length > 0 && (
            <section aria-label="Overview" className="grid grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] gap-4">
              {stats.map((stat) => (
                <StatCard key={stat.label} {...stat} />
              ))}
            </section>
          )}

          {panelCount > 0 && (
            <div className={cn("grid gap-6", panelCount > 1 && "lg:grid-cols-2")}>
              {showRequestsPanel && (
                <DashboardPanel id="recent-requests-heading" title="Recent booking requests" href="/booking-requests">
                  {requests ? <RecentRequests requests={requests} /> : <PanelError />}
                </DashboardPanel>
              )}
              {showBookingsPanel && (
                <DashboardPanel id="recent-bookings-heading" title="Recent bookings" href="/my-bookings">
                  {bookings ? <RecentBookings bookings={bookings} /> : <PanelError />}
                </DashboardPanel>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <PageContainer>
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardContent />
      </Suspense>
    </PageContainer>
  );
}