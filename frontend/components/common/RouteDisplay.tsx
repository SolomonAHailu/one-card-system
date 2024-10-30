"use client";

import { RootState } from "@/store";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

const RouteDisplay = () => {
  const currentPath = usePathname().split("/")[3];
  const { user } = useSelector((state: RootState) => state.auth);
  const currentRole = user?.role.role_name;
  return (
    <div className="bg-secondary rounded-xl p-6">{`${currentRole} / ${currentPath}`}</div>
  );
};

export default RouteDisplay;
