// validationSchemas.ts
import * as yup from "yup";

export const createDeviceSchema = (t: (key: string) => string) =>
  yup.object({
    name: yup.string().required(t("namerequired")),
    serial_number: yup.string().required(t("serialnumberrequired")),
    ip_address: yup.string().required(t("ipaddressrequired")),
    port: yup.number().required(t("portrequired")),
    Location: yup.string().required(t("locationrequired")),
  });
