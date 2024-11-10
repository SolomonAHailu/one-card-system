"use client";
import { rolePermission } from "@/lib/rolePermission";
import { RootState } from "@/store";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Copyright from "./Copyright";
import Image from "next/image";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const router = useRouter();
  const currentPath = usePathname().split("/")[3];
  const locale = usePathname().split("/")[1];
  const { user } = useSelector((state: RootState) => state.auth);
  const { isOpen } = useSelector((state: RootState) => state.sidebar);
  const userRole = user?.role.role_name.toLowerCase().trim();
  const adminSidebar = useTranslations("adminsidebar");
  const registrarSidebar = useTranslations("registrarsidebar");
  const t = user?.role.role_name === "Admin" ? adminSidebar : registrarSidebar;

  const currentSidebarItems = rolePermission.filter(
    (role) => role.role.toLowerCase().trim() === userRole
  );

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup className="flex flex-col gap-y-4">
          <div className="flex items-center gap-x-4">
            <div className="relative flex items-center justify-center h-[80px] w-[80px] rounded-full overflow-hidden">
              <Image
                src="/assets/images/logo.png"
                alt="logo"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-center text-2xl uppercase font-medium">
              <span className="text-blue-500">Semera</span>{" "}
              <span className="block text-green-400">University</span>
            </p>
          </div>
          <hr />
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col gap-y-2">
              {currentSidebarItems.map((role, index) => {
                const Icon = role.icon;

                return (
                  <SidebarMenuItem
                    key={index}
                    className={`cursor-pointer flex items-center py-1 gap-x-4 ${
                      role.permission.toLowerCase().trim() === currentPath
                        ? "border-l-4 border-[#3A5DD9]  pr-4"
                        : "hover:bg-secondary-foreground/5 hover:rounded-xs"
                    }`}
                    onClick={() =>
                      router.push(
                        `/${locale}/${user?.role.role_name
                          .toLowerCase()
                          .trim()}/${role.permission.toLowerCase().trim()}`
                      )
                    }
                  >
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
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Copyright />
      </SidebarFooter>
    </Sidebar>
  );
}
