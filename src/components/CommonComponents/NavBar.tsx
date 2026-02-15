/** @format */

"use client";

import { Bell } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { SidebarTrigger } from "../ui/sidebar";
const NavBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  if (
    pathname === "/sign-in" ||
    pathname === "/sign-up" ||
    pathname === "/forgot-pass" ||
    pathname === "/verify-method" ||
    pathname === "/verify-otp" ||
    pathname === "/set-new-pass" ||
    pathname === "/account-setup"
  ) {
    return null;
  }
  const handleBell = () => {
    router.push("/notifications");
  };

  // Get page name based on pathname
  const getPageName = () => {
    if (pathname === "/") return "Orders";
    if (pathname.startsWith("/catalogue")) return "Catalogue";
    if (pathname.startsWith("/add-new-item")) return "Add New Item";
    if (pathname.startsWith("/my-business")) return "My Business";
    if (pathname.startsWith("/wallet")) return "Wallet";
    if (pathname.startsWith("/feedback")) return "Feedback";
    if (pathname.startsWith("/notifications")) return "Notifications";
    if (pathname.startsWith("/orders")) return "Orders";
    return "";
  };

  return (
    <>
      <div className="sticky top-0 z-40 w-full h-16 bg-white flex items-center px-2 md:px-4 shadow-md border border-transparent">
        <div className="w-full flex justify-between items-center">
          <div className="flex-1 flex items-center gap-2">
            <SidebarTrigger />
            <h1 className="text-xs md:text-sm text-gray-500">
              Dashboard /{" "}
              <span className="text-gray-900 font-medium">{getPageName()}</span>
            </h1>
          </div>

          {/* right side of navbar */}
          <div className="flex items-center gap-4">
            {/* <button
              onClick={handleBell}
              className="p-2 cursor-pointer hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Notifications"
            >
              <Bell className="h-6 w-6 text-gray-700" />
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
