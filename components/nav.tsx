"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { BookUser, Soup, LucideIcon } from "lucide-react";

type Icon = LucideIcon;

type SidebarNavItem = {
  title: string;
  icon?: Icon;
};

interface DashboardNavProps {
  items: SidebarNavItem[];
}

export function DashboardNav() {
  const path = usePathname();

  return (
    <nav className="grid items-start gap-2">
      <Link href="/dashboard">
        <span className={"group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground" + (path === "/Dashboard" ? "bg-accent" : "transparent")}>
          <Soup className="mr-2 h-4 w-4" />
          <span>Status</span>
        </span>
      </Link>
      <Link href="/friends">
        <span className={"group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground" + (path === "/friends" ? "bg-accent" : "transparent")}>
          <BookUser className="mr-2 h-4 w-4" />
          <span>Friends</span>
        </span>
      </Link>
    </nav>
  );
}
