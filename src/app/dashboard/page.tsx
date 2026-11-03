import { Suspense, type ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  CloudOff,
  Inbox,
  LayoutDashboard,
  Plus,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EmptyState } from "@/components/shared/empty-state";
import { PageContainer } from "@/components/shared/page-container";
import { Skeleton } from "@/components/shared/skeletons";
import { BookingRequestActions } from "@/components/studios/booking-request-actions";
import { BookingStatusBadge } from "@/components/studios/booking-status-badge";
import { CancelBookingButton } from "@/components/studios/cancel-booking-button";
import { Button } from "@/components/ui/button";
import { formatDate, formatMoney, formatTime, initialsOf } from "@/lib/format";
import { getMyBookings, getBookingRequests, getMyStudios } from "@/lib/private-data";
import { requireUser } from "@/lib/session";
import type { Booking, BookingRequest } from "@/lib/bookings";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Dashboard" };

type Stat = {
  label: string;
  value: string;
  href: string;
  icon: LucideIcon;
};

function StatCard({ stat }: { stat: Stat }) {
  const Icon = stat.icon;
  return (
    <Link
      href={stat.href}
      className="group rounded-2xl border bg-card p-5 outline-none transition-colors hover:border-primary/60 focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <div className="flex items-start justify-between gap-3">
        <span
          aria-hidden="true"
          className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary"
        >
          <Icon className="size-5" />
        </span>
        <ArrowRight
          aria-hidden="true"
          className="mt-1 size-4 text-muted-foreground transition-colors group-hover:text-primary"
        />
      </div>
      <p className="mt-4 text-sm text-muted-foreground">{stat.label}</p>
      <p className="font-heading mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
        {stat.value}
      </p>
    </Link>
  );
}

function Panel({ title, allHref, children }: { title: string; allHref: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border bg-card p-5 sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-heading text-lg font-semibold">{title}</h2>
        <Link
          href={allHref}
          className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          View all
          <ArrowRight aria-hidden="true" className="size-3.5" />
        </Link>
      </div>
      <ul className="mt-2 divide-y divide-border/70">{children}</ul>
    </section>
  );
}

function RequestRow({ request }: { request: BookingRequest }) {
  return (
    <li className="space-y-2 py-3 first:pt-0 last:pb-0">
      <div className="flex items-center justify-between gap-3">
        <h3 className="min-w-0 truncate text-sm font-semibold">{request.studioTitle}</h3>
        <BookingStatusBadge status={request.status} />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="min-w-0 truncate text-sm text-muted-foreground">
          {request.userName || "Guest"} · {formatDate(request.date)} ·{" "}
          {formatTime(request.startTime)} – {formatTime(request.endTime)}
        </p>
        {request.status === "Pending" && (
          <BookingRequestActions id={request.id} guestName={request.userName} />
        )}
      </div>
    </li>
  );
}

function BookingRow({ booking }: { booking: Booking }) {
  return (
    <li className="space-y-2 py-3 first:pt-0 last:pb-0">
      <div className="flex items-center justify-between gap-3">
        <h3 className="min-w-0 truncate text-sm font-semibold">
          <Link href={`/studios/${booking.studioId}`} className="hover:underline">
            {booking.studioTitle}
          </Link>
        </h3>
        <BookingStatusBadge status={booking.status} />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="min-w-0 truncate text-sm text-muted-foreground">
          {formatDate(booking.date)} · {formatTime(booking.startTime)} –{" "}
          {formatTime(booking.endTime)} ({booking.hours} hr)
        </p>
        {booking.status === "Pending" && (
          <CancelBookingButton id={booking.id} title={booking.studioTitle} />
        )}
      </div>
    </li>
  );
}

function DashboardSkeleton() {
  return (
    <div role="status" aria-label="Loading dashboard" className="space-y-8">
      <div className="flex items-center gap-4">
        <Skeleton className="size-10 shrink-0 rounded-full" />
        <div className="min-w-0 space-y-2">
          <Skeleton className="h-9 w-64 max-w-full" />
          <Skeleton className="h-4 w-80 max-w-full" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
        {Array.from({ length: 4 }, (_, i) => (
          <Skeleton key={i} className="h-32 rounded-2xl" />
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        {Array.from({ length: 2 }, (_, i) => (
          <Skeleton key={i} className="h-56 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}

async function Dashboard() {
  const user = await requireUser("/dashboard");

  const greeting = (
    <header className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-4">
        <Avatar size="lg">
          <AvatarImage src={user.image} alt={user.name} referrerPolicy="no-referrer" />
          <AvatarFallback>{initialsOf(user.name)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Welcome back, {user.name}
          </h1>
          <p className="mt-1 text-muted-foreground">
            Here&apos;s your StudioSpace overview — listings, requests, and bookings in one place.
          </p>
        </div>
      </div>
      <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
        <Button nativeButton={false} render={<Link href="/add-studio" />}>
          <Plus aria-hidden="true" />
          Add New Studio
        </Button>
        <Button variant="outline" nativeButton={false} render={<Link href="/studios" />}>
          Explore Studios
        </Button>
      </div>
    </header>
  );

  let studios: Awaited<ReturnType<typeof getMyStudios>> = [];
  let requests: Awaited<ReturnType<typeof getBookingRequests>> = [];
  let bookings: Awaited<ReturnType<typeof getMyBookings>> = [];
  try {
    [studios, requests, bookings] = await Promise.all([
      getMyStudios(user),
      getBookingRequests(user),
      getMyBookings(user),
    ]);
  } catch (error) {
    console.error("Failed to load dashboard", error);
    return (
      <>
        {greeting}
        <div className="mt-8">
          <EmptyState
            icon={CloudOff}
            title="We couldn't load your dashboard"
            description="Something went wrong on our side. Please try again in a moment."
          >
            <Button nativeButton={false} render={<Link href="/dashboard" />}>
              Try again
            </Button>
          </EmptyState>
        </div>
      </>
    );
  }

  // A brand-new user sees a welcoming empty state instead of zero-value cards.
  if (studios.length === 0 && requests.length === 0 && bookings.length === 0) {
    return (
      <>
        {greeting}
        <div className="mt-8">
          <EmptyState
            icon={LayoutDashboard}
            title="Welcome to your dashboard"
            description="List your first studio or explore spaces to book — everything you host and book will show up here."
          >
            <Button nativeButton={false} render={<Link href="/add-studio" />}>
              <Plus aria-hidden="true" />
              Add your first studio
            </Button>
            <Button variant="outline" nativeButton={false} render={<Link href="/studios" />}>
              Explore studios
            </Button>
          </EmptyState>
        </div>
      </>
    );
  }

  const pendingRequests = requests.filter((request) => request.status === "Pending").length;
  // Confirmed bookings are paid for at booking time; Cancelled ones never count.
  const earnings = requests
    .filter((request) => request.status === "Confirmed" || request.status === "Completed")
    .reduce((total, request) => total + request.totalPrice, 0);

  const stats: Stat[] = [
    { label: "My Studios", value: String(studios.length), href: "/my-listings", icon: Building2 },
    { label: "Booking Requests", value: String(pendingRequests), href: "/booking-requests", icon: Inbox },
    { label: "My Bookings", value: String(bookings.length), href: "/my-bookings", icon: CalendarDays },
    { label: "Earnings", value: formatMoney(earnings), href: "/booking-requests", icon: Wallet },
  ];

  const recentRequests = requests.slice(0, 3);
  const recentBookings = bookings.slice(0, 3);

  return (
    <>
      {greeting}

      <section aria-label="Overview" className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </section>

      {(recentRequests.length > 0 || recentBookings.length > 0) && (
        <div
          className={cn(
            "mt-6 grid gap-6",
            recentRequests.length > 0 && recentBookings.length > 0 && "lg:grid-cols-2",
          )}
        >
          {recentRequests.length > 0 && (
            <Panel title="Recent booking requests" allHref="/booking-requests">
              {recentRequests.map((request) => (
                <RequestRow key={request.id} request={request} />
              ))}
            </Panel>
          )}
          {recentBookings.length > 0 && (
            <Panel title="Recent bookings" allHref="/my-bookings">
              {recentBookings.map((booking) => (
                <BookingRow key={booking.id} booking={booking} />
              ))}
            </Panel>
          )}
        </div>
      )}
    </>
  );
}

export default function DashboardPage() {
  return (
    <PageContainer>
      <Suspense fallback={<DashboardSkeleton />}>
        <Dashboard />
      </Suspense>
    </PageContainer>
  );
}
