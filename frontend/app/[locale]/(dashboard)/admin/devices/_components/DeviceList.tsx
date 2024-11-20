import { RootState } from "@/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from "@/components/ui/skeleton";
import {
  handleDeleteDevice,
  handleFetchDevice,
  resetDeviceUpdateSuccess,
} from "@/store/slices/adminSlice/device";
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
import { EditIcon } from "lucide-react";
import { MdDelete } from "react-icons/md";
import { FaSpinner } from "react-icons/fa";
import {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import EditDevice from "./EditDevice";

const DeviceList = () => {
  const t = useTranslations("adminDevice");
  const dispatch = useDispatch();
  const router = useRouter();
  const locale = usePathname().split("/")[1];
  const {
    devices,
    isDeviceError,
    isDeviceLoading,
    isDeviceDeleteLoading,
    isDeviceCreateLoading,
  } = useSelector((state: RootState) => state.device);

  useEffect(() => {
    dispatch<any>(handleFetchDevice());
  }, [dispatch]);
  return (
    <div className="relative rounded-xl p-0 h-[calc(100vh-120px)] flex flex-col gap-y-2">
      {isDeviceLoading ? (
        <div className="flex flex-col items-center w-full gap-y-8">
          {Array.from({ length: 7 }).map((_, index) => (
            <Skeleton key={index} className="w-full h-[44px] rounded-sm" />
          ))}
        </div>
      ) : devices.length === 0 ? (
        <p>{t("nodevice")}</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("name")}</TableHead>
              <TableHead>{t("serial_number")}</TableHead>
              <TableHead>{t("ip_address")}</TableHead>
              <TableHead>{t("port")}</TableHead>
              <TableHead>{t("location")}</TableHead>
              <TableHead className="text-center">{t("edit")}</TableHead>
              <TableHead className="text-center">{t("delete")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {devices.map((device, index) => (
              <TableRow
                key={index}
                className={cn(
                  index % 2 === 0 ? "" : "bg-secondary",
                  "hover:bg-primary-foreground"
                )}
              >
                <TableCell>{device.name}</TableCell>
                <TableCell>{device.serial_number}</TableCell>
                <TableCell>{device.ip_address}</TableCell>
                <TableCell>{device.port}</TableCell>
                <TableCell>{device.location}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger
                      asChild
                      className="w-full cursor-pointer text-center"
                      onClick={() => dispatch(resetDeviceUpdateSuccess())}
                    >
                      <EditIcon size={20} className="text-yellow-600" />
                    </DialogTrigger>
                    <EditDevice device={device} />
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
                          <span className="text-[#3A5DD9] italic underline block">{`${device.name}`}</span>
                        </p>
                      </DialogHeader>
                      <div className="flex items-center justify-evenly">
                        <DialogClose className="bg-red-700 hover:bg-red-800 px-7 py-2 rounded-sm text-white lowercase">
                          {t("cancel")}
                        </DialogClose>
                        <Button
                          className="bg-green-700 hover:bg-green-800 px-7 text-white lowercase"
                          onClick={() =>
                            dispatch<any>(handleDeleteDevice({ id: device.ID }))
                          }
                        >
                          {t("confirm")}
                          {isDeviceDeleteLoading && (
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

export default DeviceList;
