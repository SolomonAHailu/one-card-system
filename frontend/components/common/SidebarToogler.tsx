"use client";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { RiArrowLeftDoubleLine, RiArrowRightDoubleLine } from "react-icons/ri";
import { toggleSidebar } from "@/store/slices/common/sidebarSlice";

const SidebarToogler = () => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state: RootState) => state.sidebar);

  return (
    <div
      className={`h-[42px] flex items-center justify-center py-3 px-0 bg-[#3A5DD9]/80 hover:bg-[#2a4bc6]/40 text-primary z-50 cursor-pointer ${
        isOpen ? "rounded-tr-xl" : "rounded-tr-xl rounded-bl-xl"
      }`}
      onClick={(ev: React.MouseEvent<HTMLDivElement>) => {
        ev.stopPropagation();
        dispatch(toggleSidebar());
      }}
    >
      {isOpen ? (
        <RiArrowLeftDoubleLine className="text-white" size={24} />
      ) : (
        <RiArrowRightDoubleLine className="text-white" size={24} />
      )}
    </div>
  );
};

export default SidebarToogler;
