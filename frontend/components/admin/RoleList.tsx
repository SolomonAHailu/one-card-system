import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
import { TbListDetails } from "react-icons/tb";
import { usePathname, useRouter } from "next/navigation";
import { Dialog, DialogClose, DialogContent, DialogHeader } from "../ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import EditRole from "./EditRole";
import { Button } from "../ui/button";
import {
  handleDeleteRole,
  resetRoleDeleteSuccess,
  resetRoleUpdateSuccess,
} from "@/store/slices/adminSlice/role";
import { FaListAlt, FaSpinner } from "react-icons/fa";
import { EditIcon } from "lucide-react";
import { MdDelete } from "react-icons/md";

const RoleList = () => {
  const dispatch = useDispatch();
  const locale = usePathname().split("/")[1];
  const {
    roles,
    isRoleError,
    isRoleLoading,
    isRoleDeleteLoading,
    isRoleDeleteSuccess,
  } = useSelector((state: RootState) => state.role);
  const router = useRouter();
  return (
    <div className="relative rounded-xl p-0 h-[calc(100vh-150px)] flex flex-col gap-y-2">
      {isRoleLoading ? (
        <div className="flex flex-col items-center w-full gap-y-8">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="w-full h-[44px] rounded-sm" />
          ))}
        </div>
      ) : roles.length === 0 ? (
        <p>No role found</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-center">Details</TableHead>
              <TableHead className="text-center">Edit</TableHead>
              <TableHead className="text-center">Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roles.map((role, index) => (
              <TableRow
                key={role.ID}
                className={cn(
                  index % 2 === 0 ? "" : "bg-secondary",
                  "hover:bg-primary-foreground"
                )}
              >
                <TableCell>{role.role_name}</TableCell>
                <TableCell>
                  {role.description.length > 70
                    ? `${role.description.slice(0, 70)}...`
                    : `${role.description}`}
                </TableCell>
                <TableCell className="flex justify-center">
                  <FaListAlt
                    size={20}
                    className="text-green-600 cursor-pointer"
                    onClick={() =>
                      router.push(`/${locale}/admin/roles/${role.ID}`)
                    }
                  />
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger
                      asChild
                      className="w-full cursor-pointer text-center"
                      onClick={() => dispatch<any>(resetRoleUpdateSuccess())}
                    >
                      <EditIcon size={20} className="text-yellow-600" />
                    </DialogTrigger>
                    <EditRole role={role} />
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
                          Are you sure you want to delete this role{" "}
                          <span className="text-[#3A5DD9]">{`${role.role_name} `}</span>
                          ?
                        </p>
                      </DialogHeader>
                      <div className="flex items-center justify-evenly">
                        <DialogClose className="bg-red-700 hover:bg-red-800 px-7 py-2 rounded-sm text-white lowercase">
                          Cancel
                        </DialogClose>
                        <Button
                          className="bg-green-700 hover:bg-green-800 px-7 text-white lowercase"
                          onClick={() =>
                            dispatch<any>(handleDeleteRole({ id: role.ID }))
                          }
                        >
                          Confirm
                          {isRoleDeleteLoading && (
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
      )}
    </div>
  );
};

export default RoleList;
