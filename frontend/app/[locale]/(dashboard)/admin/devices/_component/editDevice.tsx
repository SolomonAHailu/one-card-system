import { MdOutlinePersonAddAlt1 } from "react-icons/md";
import { useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RootState } from "@/store";
import { useTranslations } from "next-intl";
import UpdateBasicInfo from "./updateDevice";
import { DeviceRecieved } from "@/store/slices/adminSlice/device";

const EditDevice = ({ device }: { device: DeviceRecieved }) => {
  const t = useTranslations("adminDevice");
  return (
    <DialogContent className="max-h-[700px] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>{t("updatedevice")}</DialogTitle>
        <DialogDescription>
          Be careful when filling in the device information.
        </DialogDescription>
      </DialogHeader>
      <UpdateBasicInfo device={device} />
    </DialogContent>
  );
};

export default EditDevice;
