"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  CalendarDays,
  ChevronDown,
  CirclePlus,
  LayoutDashboard,
  Building,
  LogOut,
  Menu as MenuIcon,
} from "lucide-react";
import { cn } from "cn";
import { useAuth, type AuthUser } from "@/components/auth/auth-provider";
import { Logo } from "@/components/layout/logo";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Explore Studios", href: "/studios" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About Us", href: "/about" },
] as const;

const DASHBOARD_LINKS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Add New Studio", href: "/add-studio", icon: CirclePlus },
  { label: "My Studio Listings", href: "/my-listings", icon: Building },
  { label: "My Bookings", href: "/my-bookings", icon: CalendarDays },
] as const;

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function navLinkClasses(active: boolean, extra?: string) {
  return cn(
    "relative rounded-md px-3 py-2 text-sm font-medium transition-colors outline-none after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-primary after:transition-transform focus-visible:ring-3 focus-visible:ring-ring/50",
    active ? "text-foreground after:scale-x-100" : "text-muted-foreground hover:text-foreground",
    extra,
  );
}

function initialsOf(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function UserAvatar({ user, size }: { user: AuthUser; size?: "sm" | "default" }) {
  return (
    <Avatar size={size}>
      <AvatarImage src={user.image} alt={user.name} referrerPolicy="no-referrer" />
      <AvatarFallback>{initialsOf(user.name)}</AvatarFallback>
    </Avatar>
  );
}

function UserMenu() {
  const { user, logout } = useAuth();
  const router = useRouter();

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={`Open account menu for ${user.name}`}
        className="flex items-center gap-2 rounded-lg border border-border bg-background px-1.5 py-1 text-sm font-medium transition-colors outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 data-popup-open:bg-muted"
      >
        <UserAvatar user={user} size="sm" />
        <span className="hidden max-w-32 truncate lg:inline">{user.name}</span>
        <ChevronDown className="size-3.5 text-muted-foreground" aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <div className="flex items-center gap-3 px-2.5 py-2">
          <UserAvatar user={user} />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{user.name}</p>
            <p className="truncate text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {DASHBOARD_LINKS.map((item) => (
            <DropdownMenuItem key={item.href} onClick={() => router.push(item.href)}>
              <item.icon aria-hidden="true" />
              {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={logout}>
          <LogOut aria-hidden="true" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function AuthActions({ onNavigate }: { onNavigate?: () => void }) {
  const { user, logout } = useAuth();

  if (user) {
    return (
      <div className="flex w-full flex-col gap-2">
        <div className="flex items-center gap-3 rounded-lg border border-border bg-background p-3">
          <UserAvatar user={user} />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{user.name}</p>
            <p className="truncate text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <Button
          variant="destructive"
          className="justify-start"
          onClick={() => {
            logout();
            onNavigate?.();
          }}
        >
          <LogOut aria-hidden="true" />
          Log out
        </Button>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-2">
      <Button nativeButton={false} render={<Link href="/login" onClick={onNavigate} />}>
        Log in
      </Button>
      <Button variant="outline" nativeButton={false} render={<Link href="/register" onClick={onNavigate} />}>
        Create account
      </Button>
    </div>
  );
}

function subscribeToScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const closeMobile = React.useCallback(() => setMobileOpen(false), []);
  const { user, isPending } = useAuth();

  // On "/" the navbar starts transparent, overlaid on the hero slider
  // (Navbar + Hero = 100svh), then becomes a fixed blurred bar on scroll.
  const isHome = pathname === "/";
  const scrolled = React.useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > 24,
    () => false,
  );

  const overlayingHero = isHome && !scrolled;

  return (
    <header
      className={cn(
        "z-50",
        // The hero is always dark, so while the navbar floats over it the header
        // uses the dark theme tokens (light text) even when the site is in light mode.
        overlayingHero
          ? "dark absolute inset-x-0 top-0 border-b border-transparent bg-transparent"
          : isHome
            ? "fixed inset-x-0 top-0 border-b border-border/70 bg-background/80 backdrop-blur-md"
            : "sticky top-0 border-b border-border/70 bg-background/80 backdrop-blur-md",
        // Keep the navbar readable over the slider while the mobile menu is open.
        overlayingHero && mobileOpen && "border-border/70 bg-background/80 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-3 px-4">
        <Logo />

        <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = isActivePath(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={navLinkClasses(active)}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {isPending ? (
            <div aria-hidden="true" className="h-9 w-28 animate-pulse rounded-lg bg-muted" />
          ) : user ? (
            <UserMenu />
          ) : (
            <>
              <Button
                variant="ghost"
                className="hidden sm:inline-flex"
                nativeButton={false}
                render={<Link href="/login" />}
              >
                Log in
              </Button>
              <Button className="hidden sm:inline-flex" nativeButton={false} render={<Link href="/register" />}>
                Register
              </Button>
            </>
          )}

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              aria-label="Open navigation menu"
              className="lg:hidden"
              render={<Button variant="ghost" size="icon" />}
            >
              <MenuIcon aria-hidden="true" />
            </SheetTrigger>
            <SheetContent side="right" className="gap-0 p-0">
              <SheetHeader className="border-b">
                <SheetTitle>
                  <Logo href="/" className="text-base" />
                </SheetTitle>
                <SheetDescription className="sr-only">Main navigation menu</SheetDescription>
              </SheetHeader>

              <nav aria-label="Mobile navigation" className="flex flex-col gap-1 p-4">
                {NAV_LINKS.map((link) => {
                  const active = isActivePath(pathname, link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      onClick={closeMobile}
                      className={navLinkClasses(active, "flex items-center justify-between")}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-auto border-t p-4">
                <AuthActions onNavigate={closeMobile} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
