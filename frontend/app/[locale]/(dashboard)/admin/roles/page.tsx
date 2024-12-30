"use client";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import AddRole from "./_components/AddRole";
import RoleList from "@/app/[locale]/(dashboard)/admin/roles/_components/RoleList";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { RootState } from "@/store";
import { handleFetchRole } from "@/store/slices/adminSlice/role";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { ImLoop2 } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { MdDomainAdd } from "react-icons/md";

const AllrolesPage = () => {
  const dispatch = useDispatch();
  const t = useTranslations("roles");
  const [refetchRole, setRefetchRole] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const refetchRoles = () => {
    setRefetchRole(true);
    setTimeout(() => {
      setRefetchRole(false);
    }, 500);
    dispatch<any>(handleFetchRole());
  };
  return (
    <div className="flex flex-col">
      <div className="flex items-baseline justify-between gap-x-4">
        <div
          className="h-8 w-8 bg-[#3A5DD9] hover:bg-[#2a4bc6] flex items-center justify-center rounded-sm cursor-pointer"
          onClick={refetchRoles}
        >
          <ImLoop2
            className={`text-sm transition-transform duration-500 text-white ${
              refetchRole ? "animate-spin" : ""
            }`}
          />
        </div>
        <div className="flex items-center gap-x-20">
          <div className="flex items-center justify-center gap-2 relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              <Search size={18} />
            </div>
            <Input
              id="search-by-name"
              type="text"
              placeholder={t("searchbyname")}
              className="pl-10 ring-0 border-2 focus-visible:ring-offset-0 focus-visible:ring-1 min-w-96"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Dialog>
            <DialogTrigger className="h-8 w-8 bg-[#3A5DD9] hover:bg-[#2a4bc6] flex items-center justify-center rounded-sm cursor-pointer">
              <MdDomainAdd className="text-xl text-white" />
            </DialogTrigger>
            <AddRole />
          </Dialog>
        </div>
      </div>
      <RoleList searchTerm={searchTerm} />
    </div>
  );
};

export default AllrolesPage;
