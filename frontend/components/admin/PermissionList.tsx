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
import { FaSpinner } from "react-icons/fa";
import EditPermission from "./EditPermission";
import { handleDeletePermission } from "@/store/slices/adminSlice/permission";

const PermissionList = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const locale = usePathname().split("/")[1];
  const { permissions, isPermissionLoading, isPermissionDeleteLoading } =
    useSelector((state: RootState) => state.permission);

  return (
    <div className="relative rounded-xl p-0 h-[calc(100vh-150px)] flex flex-col gap-y-2">
      {isPermissionLoading ? (
        <div className="flex flex-col items-center w-full gap-y-8">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="w-full h-[44px] rounded-sm" />
          ))}
        </div>
      ) : permissions.length === 0 ? (
        <p>No permission found</p>
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
            {permissions.map((permission, index) => (
              <TableRow
                key={permission.ID}
                className={cn(
                  index % 2 === 0 ? "" : "bg-secondary",
                  "hover:bg-primary-foreground"
                )}
              >
                <TableCell>{permission.permissions_name}</TableCell>
                <TableCell>
                  {permission.description.length > 70
                    ? `${permission.description.slice(0, 70)}...`
                    : `${permission.description}`}
                </TableCell>
                <TableCell
                  onClick={() =>
                    router.push(`/${locale}/admin/permissions/${permission.ID}`)
                  }
                >
                  <div className="bg-[#86EFAC] hover:bg-[#7ee0a2 flex items-center justify-center rounded-xl py-1 px-2 text-xs text-black cursor-pointer">
                    Details
                  </div>
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger
                      className="w-full"
                      onClick={() => dispatch<any>(resetRoleUpdateSuccess())}
                    >
                      <div className="bg-[#FEF08A] hover:bg-[#efe382] flex items-center justify-center rounded-xl py-1 px-2 text-xs text-black cursor-pointer">
                        Edit
                      </div>
                    </DialogTrigger>
                    <EditPermission permission={permission} />
                  </Dialog>
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger className="w-full">
                      <div className="bg-[#FCA5A5] hover:bg-[#ed9b9b] flex items-center justify-center rounded-xl py-1 px-2 text-xs text-black cursor-pointer">
                        Delete
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-sm text-center flex flex-col gap-y-8">
                      <DialogHeader className="mt-4 mx-2">
                        <p className="text-center">
                          Are you sure you want to delete this role?
                        </p>
                      </DialogHeader>
                      <div className="flex items-center justify-evenly">
                        <DialogClose className="bg-red-500 hover:bg-red-400 px-7 py-2 rounded-sm text-white lowercase">
                          Cancel
                        </DialogClose>
                        <Button
                          className="bg-green-500 hover:bg-green-400 px-7 text-white lowercase"
                          onClick={() =>
                            dispatch<any>(
                              handleDeletePermission({ id: permission.ID })
                            )
                          }
                        >
                          Confirm
                          {isPermissionDeleteLoading && (
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

export default PermissionList;
