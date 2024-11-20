"use client";
import { IoMdLogOut } from "react-icons/io";
import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
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

  return (
    <Dialog>
      <DialogTrigger>
        {/* <div className="bg-transparent hover:bg-background/90"> */}
        <div className="bg-transparent">
          {/* <IoMdLogOut className="text-red-500" /> */}
          <LogOut className="text-red-500" size={17} />
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-xs text-center flex flex-col gap-y-8">
        <DialogHeader>
          <DialogTitle className=" text-center">Are you sure?</DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-evenly">
          <DialogClose className="bg-red-500 hover:bg-red-400 px-7 py-2 rounded-sm">
            Cancel
          </DialogClose>
          <Button
            className="bg-green-500 hover:bg-green-400 px-7"
            onClick={() =>
              dispatch<any>(handleLogout({ router, languagePrefix }))
            }
          >
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LogoutButton;
