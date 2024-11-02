// validationSchemas.ts
import * as yup from "yup";

export const createPermissionSchema = (t: (key: string) => string) =>
  yup.object({
    permissions_name: yup
      .string()
      .required(t("rolenamerequired"))
      .min(3, t("rolenameminlength")),
    description: yup
      .string()
      .required(t("discriptionrequired"))
      .min(20, t("meaningfulldescription")),
  });
