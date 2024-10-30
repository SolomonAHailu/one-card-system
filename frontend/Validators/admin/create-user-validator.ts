// validationSchemas.ts
import * as yup from "yup";

export const createUserSchema = (t: (key: string) => string) =>
  yup.object({
    first_name: yup
      .string()
      .required(t("firstnamerequired"))
      .min(3, t("firstnameminlength")),
    father_name: yup
      .string()
      .required(t("fathernamerequired"))
      .min(3, t("fathernameminlength")),
    grand_father_name: yup
      .string()
      .required(t("grandfathernamerequired"))
      .min(3, t("grandfathernameminlength")),
    email: yup.string().required(t("emailrequired")).email(t("invalidemail")),
    role_id: yup.number().required(t("roleidrequired")),
  });
