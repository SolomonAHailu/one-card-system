"use client";
import { IoMdLogOut } from "react-icons/io";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { handleLogout } from "@/store/slices/common/authSlice";
import { useDispatch } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

const LogoutButton = () => {
  const router = useRouter();
  const currentPath = usePathname();
  const dispatch = useDispatch();
  const languagePrefix = currentPath.split("/")[1];
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Dialog open={isOpen}>
      <DialogTrigger>
        <div
          className="bg-transparent hover:bg-background/90"
          onClick={() => setIsOpen(true)}
        >
          <IoMdLogOut className="text-red-500" />
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-xs text-center">
        <DialogHeader className="flex flex-col gap-y-8">
          <DialogTitle className=" text-center">Are you sure?</DialogTitle>
          <DialogDescription className="flex items-center justify-evenly">
            <Button
              className="bg-red-500 hover:bg-red-400 px-7"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-green-500 hover:bg-green-400 px-7"
              onClick={() =>
                dispatch<any>(handleLogout({ router, languagePrefix }))
              }
            >
              Confirm
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default LogoutButton;
