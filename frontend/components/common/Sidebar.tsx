"use client";
import { rolePermission } from "@/lib/rolePermission";
import { RootState } from "@/store";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const router = useRouter();
  const currentPath = usePathname().split("/")[3];
  const locale = usePathname().split("/")[1];
  const { user } = useSelector((state: RootState) => state.auth);
  const { isOpen } = useSelector((state: RootState) => state.sidebar);
  const userRole = user?.role.role_name.toLowerCase().trim();
  const t = useTranslations("adminsidebar");
  // const adminTranslations = useTranslations("adminsidebar");
  // const registerTranslations = useTranslations("registersidebar");
  // const cafeTranslations = useTranslations("cafesidebar");
  // const t =
  //   userRole === "admin"
  //     ? adminTranslations
  //     : userRole === "register"
  //     ? registerTranslations
  //     : cafeTranslations;

  //Get the current sidebar items for the user
  const currentSidebarItems = rolePermission.filter(
    (role) => role.role.toLowerCase().trim() == userRole
  );

  return (
    <div
      className={
        isOpen
          ? "min-w-72 bg-secondary/60 rounded-tl-2xl rounded-bl-2xl py-8 px-5 flex flex-col gap-y-4"
          : "hidden"
      }
    >
      {currentSidebarItems.map((role, index) => (
        <div
          key={index}
          className={`px-1 py-2 cursor-pointer ${
            role.permission.toLowerCase().trim() === currentPath
              ? "border-l-4 border-[#3A5DD9]"
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
          <h1 className="font-poppins font-light text-lg leading-8 ml-2">
            {t(`${role.permission.toLowerCase().trim()}`)}
          </h1>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
