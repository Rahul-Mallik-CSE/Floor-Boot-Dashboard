/** @format */

"use client";

import { Bell } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { SidebarTrigger } from "../ui/sidebar";
const NavBar = () => {
  const pathname = usePathname();
  const router = useRouter();
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
  const handleBell = () => {
    router.push("/notifications");
  };

  return (
    <>
      <div className="sticky top-0 z-40 w-full h-16 bg-white flex items-center px-2 md:px-4 shadow-md border border-transparent">
        <div className="w-full flex justify-between items-center">
          <div className="flex-1 flex items-center gap-2">
            <SidebarTrigger />
            <h1 className="text-xs md:text-sm text-gray-500">Dashboard /</h1>
          </div>

          {/* right side of navbar */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleBell}
              className="p-2 cursor-pointer hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Notifications"
            >
              <Bell className="h-6 w-6 text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
