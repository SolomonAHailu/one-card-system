"use client";
import { RootState } from "@/store";
import MaxWidthWrapper from "./MaxSizeWrapper";
import { ThemeSelector } from "./ThemeSelector";
import { useSelector } from "react-redux";
import LanguangeSelector from "./LanguangeSelector";
import LogoutButton from "./Logout";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  return (
    <div className="sticky h-16 top-0 z-50 inset-0 bg-primary-foreground text-primary">
      <MaxWidthWrapper className="h-full">
        <div className="flex items-center justify-between h-full w-full">
          <div className="relative">Logo will be here</div>
          <div className="flex items-center gap-x-8">
            {isAuthenticated && (
              <p className="text-sm">
                <span className="font-semibold mr-2 text-lg">Welcome</span>
                {` ${user?.first_name}-${user?.father_name}`}
              </p>
            )}
            <LanguangeSelector />
            <ThemeSelector />
            {isAuthenticated && <LogoutButton />}
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Navbar;
