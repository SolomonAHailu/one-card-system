import MaxWidthWrapper from "./MaxSizeWrapper";

const Navbar = () => {
  return (
    <div className="sticky h-16 top-0 z-50 inset-0 border-b border-gray-500 bg-gray-200">
      <MaxWidthWrapper className="h-full">
        <div className="flex items-center h-full">Navbar will be here</div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Navbar;
