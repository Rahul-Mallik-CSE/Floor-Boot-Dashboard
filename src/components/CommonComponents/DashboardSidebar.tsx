/** @format */

"use client";

import type React from "react";

import Link from "next/link";
import { cn } from "@/lib/utils";

import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import {
  IoDocumentTextOutline,
  IoChatbubblesOutline,
  IoGridOutline,
} from "react-icons/io5";
import { PiChatsCircle, PiWallet } from "react-icons/pi";
import { TfiBag } from "react-icons/tfi";
import { RiBriefcaseLine, RiMapPinLine } from "react-icons/ri";
import { GoPlus, GoTag } from "react-icons/go";

import { AiOutlineDollarCircle } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { BiSolidPackage, BiSupport, BiUserPlus } from "react-icons/bi";
import { FaPlus, FaShieldAlt, FaTag, FaUserAlt } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import LogoutModal from "./LogOutModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// import { logout } from "@/service/authService";
export default function DashboardSidebar() {
  return <DashboardSidebarContent />;
}

function DashboardSidebarContent() {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const { state } = useSidebar();

  const handleLogout = async () => {
    // Perform logout actions here (clear tokens, etc.)
    // Redirect to login page
    // await logout();
    // localStorage.removeItem("accessToken");
    // await logout();
    router.push("/sign-in");

    setIsLogoutModalOpen(false);
  };

  if (
    pathname === "/sign-in" ||
    pathname === "/sign-up" ||
    pathname === "/forget-pass" ||
    pathname === "/verify-method" ||
    pathname === "/verify-otp" ||
    pathname === "/reset-pass" ||
    pathname === "/account-setup"
  ) {
    return null;
  }

  const isCollapsed = state === "collapsed";

  const navItems = [
    { href: "/", label: "Dashboard", icon: IoGridOutline },
    { href: "/job-management", label: "Job Management", icon: RiBriefcaseLine },
    {
      href: "/preferred-operatives",
      label: "Preferred Operatives",
      icon: FaShieldAlt,
    },
    { href: "/contracts", label: "Contracts", icon: IoDocumentTextOutline },
    { href: "/chat", label: "Chat", icon: IoChatbubblesOutline },
    {
      href: "/operatives-tracker",
      label: "Operatives Tracker",
      icon: RiMapPinLine,
    },
    { href: "/payroll", label: "Payroll", icon: AiOutlineDollarCircle },
    { href: "/settings", label: "Settings", icon: FiSettings },
    { href: "/support", label: "Support", icon: BiSupport },
    { href: "/my-referral-user", label: "My Referral User", icon: BiUserPlus },
  ];

  return (
    <>
      <Sidebar className="border-r-0  " collapsible="icon">
        <SidebarContent className="bg-white">
          <div
            className={`flex items-center justify-center  px-0 md:px-4 py-4 relative ${
              isCollapsed ? "px-2" : "gap-2"
            }`}
          >
            <div className="flex items-center gap-3">
              <Link href="/">
                <Image
                  src="/DMS-Logo.png"
                  alt="Logo"
                  width={70}
                  height={60}
                  className="rounded-xl object-contain"
                />
              </Link>
            </div>
          </div>

          <SidebarMenu
            className={
              isCollapsed ? "px-2 space-y-1 items-center" : "md:px-6 space-y-1"
            }
          >
            <p className="text-gray-500 text-sm">DASHBOARD</p>
            <NavItem
              href="/"
              icon={BiSolidPackage}
              label={"Orders"}
              active={pathname === "/" || pathname.startsWith("/" + "/")}
              collapsed={isCollapsed}
            />
            <NavItem
              href="/catalogue"
              icon={GoTag}
              label={"Catalogue"}
              active={
                pathname === "/catalogue" ||
                pathname.startsWith("/catalogue" + "/")
              }
              collapsed={isCollapsed}
            />
            <NavItem
              href="/add-new-item"
              icon={GoPlus}
              label={"Add New Item"}
              active={
                pathname === "/add-new-item" ||
                pathname.startsWith("/add-new-item" + "/")
              }
              collapsed={isCollapsed}
            />
            <p className="text-gray-500 text-sm">Account Management</p>
            <NavItem
              href="/my-business"
              icon={TfiBag}
              label={"My Business"}
              active={
                pathname === "/my-business" ||
                pathname.startsWith("/my-business" + "/")
              }
              collapsed={isCollapsed}
            />
            <NavItem
              href="/wallet"
              icon={PiWallet}
              label={"Wallet"}
              active={
                pathname === "/wallet" || pathname.startsWith("/wallet" + "/")
              }
              collapsed={isCollapsed}
            />
            <NavItem
              href="/feedback"
              icon={PiChatsCircle}
              label={"Feedback"}
              active={
                pathname === "/feedback" ||
                pathname.startsWith("/feedback" + "/")
              }
              collapsed={isCollapsed}
            />
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className={`bg-white  ${isCollapsed ? "px-2" : "px-6"}`}>
          <div className={`${isCollapsed ? "w-full" : "w-full"} py-4`}>
            {!isCollapsed ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="bg-blue-50 rounded-lg p-1 flex items-center gap-4 cursor-pointer hover:bg-blue-100 transition-colors">
                    <Image
                      src="/logo.png"
                      alt="profile"
                      width={34}
                      height={34}
                      className="rounded-full object-cover"
                      unoptimized
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold truncate max-w-30">
                            User
                          </p>
                          <p className="text-xs text-gray-400">General</p>
                        </div>
                        <div className="text-gray-500">▾</div>
                      </div>
                    </div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem
                    onClick={() => setIsLogoutModalOpen(true)}
                    className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                  >
                    <IoLogOutOutline className="mr-2 h-4 w-4" />
                    <span>Log Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center justify-center py-2 cursor-pointer">
                    <div className="rounded-full p-1 bg-blue-100 hover:bg-blue-200 transition-colors">
                      <FaUserAlt className="h-4 w-4" />
                    </div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem
                    onClick={() => setIsLogoutModalOpen(true)}
                    className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                  >
                    <IoLogOutOutline className="mr-2 h-4 w-4" />
                    <span>Log Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <div className="mt-4">
              <button className="w-full bg-white border border-blue-100 rounded-lg py-1 flex items-center justify-center gap-3 text-blue-800 font-medium">
                <span className="text-xl">👑</span>
                {!isCollapsed && <span>Upgrade Plan</span>}
              </button>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </>
  );
}

// ...existing code...

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  active: boolean;
  collapsed?: boolean;
}

function NavItem({
  href,
  icon: Icon,
  label,
  active,
  collapsed = false,
}: NavItemProps) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        className={cn(
          active
            ? "bg-gray-200 text-black hover:text-black hover:bg-gray-200 focus:bg-gray-200 font-medium"
            : "bg-transparent text-gray-700 hover:bg-gray-50 hover:text-black font-medium"
        )}
      >
        <Link
          href={href}
          className={cn(
            collapsed
              ? "flex items-center justify-center px-2 py-3 transition-colors rounded-full w-12 h-12 mx-auto"
              : "flex items-center gap-3 px-4 py-3 transition-colors rounded-md"
          )}
        >
          <Icon size={collapsed ? 20 : 18} />
          {!collapsed && <span className="text-sm">{label}</span>}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
// ...existing code...
