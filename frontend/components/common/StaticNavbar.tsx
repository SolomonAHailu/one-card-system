"use client";
import { RootState } from "@/store";
import MaxWidthWrapper from "./MaxSizeWrapper";
import { ThemeSelector } from "./ThemeSelector";
import { useSelector } from "react-redux";
import LanguangeSelector from "./LanguangeSelector";
import LogoutButton from "./Logout";
import NavbarSheet from "./NavbarSheet";
import { useTranslations } from "next-intl";

const StaticNavbar = () => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const t = useTranslations("navbar");

  return (
    <div className="fixed top-0 left-0 w-full h-16 z-50">
      <MaxWidthWrapper className="h-full">
        <div className="flex items-center justify-between h-full w-full">
          <div className="relative flex items-center justify-center"></div>
          <div className="hidden md:flex items-center gap-x-8">
            {isAuthenticated && (
              <p className="text-sm">
                <span className="font-semibold mr-2 text-lg">
                  {t("welcome")}
                </span>
                {` ${user?.first_name}-${user?.father_name}`}
              </p>
            )}
            <LanguangeSelector />
            <ThemeSelector />
            {isAuthenticated && <LogoutButton />}
          </div>
          <NavbarSheet />
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default StaticNavbar;
