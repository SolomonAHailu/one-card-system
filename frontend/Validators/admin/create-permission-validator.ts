// validationSchemas.ts
import * as yup from "yup";

export const createPermissionSchema = (t: (key: string) => string) =>
  yup.object({
    permissions_name: yup
      .string()
      .required(t("permissionnamerequired"))
      .min(3, t("permissionnameminlength")),
    description: yup
      .string()
      .required(t("permissiondescriptionrequired"))
      .min(20, t("permissionmeaningfuldescription")),
  });
