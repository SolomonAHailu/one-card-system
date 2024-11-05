"use client";
import { rolePermission } from "@/lib/rolePermission";
import { RootState } from "@/store";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import SidebarToogler from "./SidebarToogler";
import Copyright from "./Copyright";

const Sidebar = () => {
  const router = useRouter();
  const currentPath = usePathname().split("/")[3];
  const locale = usePathname().split("/")[1];
  const { user } = useSelector((state: RootState) => state.auth);
  const { isOpen } = useSelector((state: RootState) => state.sidebar);
  const userRole = user?.role.role_name.toLowerCase().trim();
  const t = useTranslations("adminsidebar");

  // Get the current sidebar items for the user
  const currentSidebarItems = rolePermission.filter(
    (role) => role.role.toLowerCase().trim() === userRole
  );

  return (
    <div className="min-w-fit bg-secondary/60 py-10 px-5 flex flex-col justify-between items-center relative rounded-2xl">
      <div className="flex flex-col items-start gap-y-4">
        {currentSidebarItems.map((role, index) => {
          const Icon = role.icon;

          return (
            <div
              key={index}
              className={`cursor-pointer flex items-center gap-x-4 ${
                role.permission.toLowerCase().trim() === currentPath
                  ? "border-l-4 border-[#3A5DD9]  pr-4"
                  : "hover:bg-primary-foreground hover:rounded-xs"
              }`}
              onClick={() =>
                router.push(
                  `/${locale}/${user?.role.role_name
                    .toLowerCase()
                    .trim()}/${role.permission.toLowerCase().trim()}`
                )
              }
            >
              <div className="absolute right-0 top-0 z-50">
                <SidebarToogler />
              </div>
              <Icon className="ml-2" />
              <h1
                className={
                  isOpen
                    ? "block font-poppins font-light text-lg leading-8"
                    : "hidden"
                }
              >
                {t(`${role.permission.toLowerCase().trim()}`)}
              </h1>
            </div>
          );
        })}
      </div>
      {isOpen && <Copyright />}
    </div>
  );
};

export default Sidebar;
