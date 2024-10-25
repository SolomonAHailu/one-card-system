import MaxWidthWrapper from "./MaxSizeWrapper";
import { ThemeSelector } from "./ThemeSelector";

const Navbar = () => {
  return (
    <div className="sticky h-16 top-0 z-50 inset-0 border-b border-gray-500 bg-primary-foreground text-primary">
      <MaxWidthWrapper className="h-full">
        <div className="flex items-center h-full justify-between">
          <p>Nav bar will be here</p>
          <ThemeSelector />
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Navbar;
