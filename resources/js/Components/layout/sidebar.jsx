import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import { useSidebar } from "@/hooks/useSidebar";
import DashboardNav from "./dashboard-nav";

export default function Sidebar({ className }) {
  const { isMinimized, toggle } = useSidebar();
  const [status, setStatus] = useState(false);

  const handleToggle = () => {
    setStatus(true);
    toggle();
    setTimeout(() => setStatus(false), 500);
  };
  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: "dashboard",
      label: "Dashboard",
    },
    {
      title: "User",
      href: "/dashboard/user",
      icon: "user",
      label: "user",
    },
    {
      title: "Employee",
      href: "/dashboard/employee",
      icon: "employee",
      label: "employee",
    },
    {
      title: "Profile",
      href: "/dashboard/profile",
      icon: "profile",
      label: "profile",
    },
    {
      title: "Kanban",
      href: "/dashboard/kanban",
      icon: "kanban",
      label: "kanban",
    },
    {
      title: "Login",
      href: "/",
      icon: "login",
      label: "login",
    },
  ];
  return (
    <nav
      className={cn(
        `relative hidden h-screen flex-none border-r pt-20 md:block`,
        status && "duration-500",
        !isMinimized ? "w-72" : "w-[72px]",
        className
      )}
    >
      <ChevronLeft
        className={cn(
          "absolute -right-3 top-20 cursor-pointer rounded-full border bg-background text-3xl text-foreground",
          isMinimized && "rotate-180"
        )}
        onClick={handleToggle}
      />
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="mt-3 space-y-1">
            <DashboardNav items={navItems} />
          </div>
        </div>
      </div>
    </nav>
  );
}
