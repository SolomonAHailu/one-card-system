import { RootState } from "@/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


import { Skeleton } from "@/components/ui/skeleton";
import {
  handleDeleteUser,
  handleFetchUser,
} from "@/store/slices/adminSlice/user";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import EditUser from "./EditUser";
import UserDetails from "./userdetails/UserDetails";
import { DeleteIcon, EditIcon } from "lucide-react";
import { MdDelete, MdDetails } from "react-icons/md";
import { FaListAlt, FaSpinner } from "react-icons/fa";
import {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

const UserList = ({
  role_id,
  limit,
  name,
  page,
  setPage,
}: {
  page: number;
  setPage: (prev: number) => void;
  role_id: number;
  limit: number;
  name?: string;
}) => {
  const t = useTranslations("adminusers");
  const dispatch = useDispatch();
  const router = useRouter();
  const locale = usePathname().split("/")[1];
  const {
    users,
    isUserError,
    isUserLoading,
    currentPage,
    totalPages,
    totalUsers,
    isUserCreateLoading,
  } = useSelector((state: RootState) => state.user);

  console.log("USER NAME TO BE FETCHED", name);

  useEffect(() => {
    dispatch<any>(handleFetchUser({ role_id, page, limit, name: name ?? "" }));
  }, [dispatch, role_id, page, limit, name]);

  const renderPageNumbers = () => {
    let pagesToDisplay = [];
    if (currentPage > 2) {
      pagesToDisplay.push(
        <PaginationItem key="start-ellipsis">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    for (
      let i = Math.max(1, currentPage - 1);
      i <= Math.min(totalPages, currentPage + 1);
      i++
    ) {
      pagesToDisplay.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            className={
              currentPage === i
                ? "rounded-sm border-2 border-primary m-2 text-xs h-10 w-10 flex items-center justify-center"
                : "bg-transparent rounded-sm hover:bg-background/90 hover:rounded-sm hover:h-8 hover:w-8"
            }
            onClick={() => setPage(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (currentPage < totalPages - 1) {
      pagesToDisplay.push(
        <PaginationItem key="end-ellipsis">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    return pagesToDisplay;
  };

  if (isUserLoading) {
    return (
      <div className="h-[calc(100vh-165px)] flex flex-col items-center justify-between w-full">
        <div className="flex flex-col items-center w-full gap-y-8">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="w-full h-[44px] rounded-sm" />
          ))}
        </div>
        <div className="flex gap-x-2">
          <Skeleton className="w-[70px] h-[34px] rounded-sm" />
          <Skeleton className="w-[150px] h-[34px] rounded-sm" />
          <Skeleton className="w-[70px] h-[34px] rounded-sm" />
        </div>
      </div>
    );
  } else if (users.length === 0) {
    return <div className="text-[#3A5DD9]">{t("nouser")}</div>;
  } else {
    return (
      <div className="relative rounded-xl p-0 h-[calc(100vh-165px)] flex flex-col gap-y-2">
        <div className="h-5/6 flex-1 rounded-xl rounded-bl-none rounded-br-none overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("firstname")}</TableHead>
                <TableHead>{t("fathername")}</TableHead>
                <TableHead>{t("grandfathername")}</TableHead>
                <TableHead>{t("email")}</TableHead>
                <TableHead className="text-center">{t("details")}</TableHead>
                <TableHead className="text-center">{t("edit")}</TableHead>
                <TableHead className="text-center">{t("delete")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user, index) => (
                <TableRow
                  key={user.ID}
                  className={cn(
                    index % 2 === 0 ? "" : "bg-secondary",
                    "hover:bg-primary-foreground",
                    "h-8"
                  )}
                >
                  <TableCell>{user.first_name}</TableCell>
                  <TableCell>{user.father_name}</TableCell>
                  <TableCell>{user.grand_father_name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger
                        asChild
                        className="w-full cursor-pointer text-center"
                      >
                        <FaListAlt size={20} className="text-green-600" />
                      </DialogTrigger>
                      <UserDetails user={user} />
                    </Dialog>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger
                        asChild
                        className="w-full cursor-pointer text-center"
                      >
                        <EditIcon size={20} className="text-yellow-600" />
                      </DialogTrigger>
                      <EditUser user={user} />
                    </Dialog>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger
                        asChild
                        className="w-full cursor-pointer text-center"
                      >
                        <MdDelete size={20} className="text-red-600" />
                      </DialogTrigger>
                      <DialogContent className="max-w-sm text-center flex flex-col gap-y-8">
                        <DialogHeader className="mt-4 mx-2">
                          <p className="text-center">
                            {t("suretodelete")}
                            <span className="text-[#3A5DD9] italic underline">{` ${user.first_name}-${user.father_name} `}</span>
                            ?
                          </p>
                        </DialogHeader>
                        <div className="flex items-center justify-evenly">
                          <DialogClose className="bg-red-700 hover:bg-red-800 px-7 py-2 rounded-sm text-white lowercase">
                            {t("cancel")}
                          </DialogClose>
                          <Button
                            className="bg-green-700 hover:bg-green-800 px-7 text-white lowercase"
                            onClick={() =>
                              dispatch<any>(handleDeleteUser({ id: user.ID }))
                            }
                          >
                            {t("confirm")}
                            {isUserCreateLoading && (
                              <FaSpinner className="animate-spin ml-2 text-white text-xs" />
                            )}
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Pagination className=" rounded-none">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                className={cn(
                  `${
                    currentPage === 1
                      ? "bg-primary-foreground opacity-25 cursor-default"
                      : ""
                  } bg-primary-foreground hover:bg-primary-foreground text-xs`
                )}
                onClick={() => setPage(Math.max(currentPage - 1, 1))}
              />
            </PaginationItem>

            {renderPageNumbers()}

            <PaginationItem>
              <PaginationNext
                href="#"
                className={cn(
                  `${
                    currentPage === totalPages
                      ? "bg-primary-foreground opacity-25 cursor-default"
                      : ""
                  } bg-primary-foreground hover:bg-primary-foreground text-xs`
                )}
                onClick={() => setPage(Math.min(currentPage + 1, totalPages))}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    );
  }
};

export default UserList;
