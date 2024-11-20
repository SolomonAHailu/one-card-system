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
import { SidebarTrigger } from "../ui/sidebar";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const t = useTranslations("navbar");
  return (
    // <div className="relative h-16 z-50 inset-0 bg-secondary rounded-xl">
    <div className="relative h-14 z-50 inset-0 bg-secondary rounded-xl filter drop-shadow-sm">
      <MaxWidthWrapper className="h-full">
        {isAuthenticated && (
          <SidebarTrigger className="absolute top-4 left-4" />
        )}
        <div className="flex items-center justify-end h-full w-full">
          <div className="hidden md:flex items-center gap-x-8">
            {isAuthenticated && (
              <p className="text-sm">
                <span className="font-semibold mr-2 text-sm">
                  {t("welcome")}
                </span>
                {` ${user?.first_name} ${user?.father_name}`}
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

export default Navbar;
