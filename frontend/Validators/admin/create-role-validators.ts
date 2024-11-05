// validationSchemas.ts
import * as yup from "yup";

export const createRoleSchema = (t: (key: string) => string) =>
  yup.object({
    role_name: yup
      .string()
      .required(t("rolenamerequired"))
      .min(3, t("minrolelength")),
    description: yup
      .string()
      .required(t("roledescriptionrequired"))
      .min(20, t("meaningfulldescription")),
  });
