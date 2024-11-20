"use client";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { RootState } from "@/store";
import { IoMdMenu } from "react-icons/io";
import { useSelector } from "react-redux";
import LanguangeSelector from "./LanguangeSelector";
import { ThemeSelector } from "./ThemeSelector";
import LogoutButton from "./Logout";
import Copyright from "./Copyright";
const NavbarSheet = () => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  return (
    <Sheet>
      <SheetTrigger className="md:hidden">
        <IoMdMenu className="text-2xl" />
      </SheetTrigger>
      <SheetContent className="pt-8">
        <SheetHeader>
          <SheetTitle>
            {isAuthenticated && (
              <p className="text-sm">
                <span className="font-semibold mr-2 text-lg">Welcome</span>
                {` ${user?.first_name} ${user?.father_name}`}
              </p>
            )}
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col items-center gap-y-4 pt-14">
          <div className="flex items-center justify-center gap-x-2 bg-primary-foreground px-4 rounded-sm py-2 min-w-96">
            <p>Language</p>
            <LanguangeSelector />
          </div>
          <div className="flex items-center justify-center gap-x-2 bg-primary-foreground px-4 rounded-sm py-2 min-w-96">
            <p>Theme</p>
            <ThemeSelector />
          </div>
          {isAuthenticated && (
            <div className="flex items-center justify-center gap-x-2 bg-primary-foreground px-4 rounded-sm py-2 min-w-96">
              <p className="text-red-500 text-lg">Logout</p>
              <LogoutButton />
            </div>
          )}
        </div>
        <SheetFooter className="text-center mt-96">
          <Copyright />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default NavbarSheet;
