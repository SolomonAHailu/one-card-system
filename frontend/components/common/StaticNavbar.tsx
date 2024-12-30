"use client";
import { RootState } from "@/store";
import MaxWidthWrapper from "./MaxSizeWrapper";
import { ThemeSelector } from "./ThemeSelector";
import { useSelector } from "react-redux";
import LanguangeSelector from "./LanguangeSelector";
import LogoutButton from "./Logout";
import { useState } from "react";
import NavbarSheet from "./NavbarSheet";
import { useTranslations } from "next-intl";
import Image from "next/image";

const StaticNavbar = () => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const t = useTranslations("navbar");
  return (
    <div className="relative h-16 z-50 inset-0  rounded-xl">
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
