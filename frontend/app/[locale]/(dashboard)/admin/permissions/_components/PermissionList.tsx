import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { RootState } from "@/store";
import {
  handleDeletePermission,
  resetPermissionUpdateSuccess,
} from "@/store/slices/adminSlice/permission";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { EditIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { FaSpinner } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import EditPermission from "./EditPermission";

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
                <TableCell>
                  <Dialog>
                    <DialogTrigger
                      asChild
                      className="w-full cursor-pointer text-center"
                      onClick={() => dispatch(resetPermissionUpdateSuccess())}
                    >
                      <EditIcon size={20} className="text-yellow-600" />
                    </DialogTrigger>
                    <EditPermission permission={permission} />
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
                          Are you sure you want to delete this permission
                          <span className="text-[#3A5DD9]">{`${permission.permissions_name} `}</span>
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
