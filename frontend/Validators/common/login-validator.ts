// validationSchemas.ts
import * as yup from "yup";

export const createLoginSchema = (t: (key: string) => string) =>
  yup.object({
    email: yup.string().required(t("emailrequired")).email(t("invalidemail")),
    password: yup
      .string()
      .required(t("passwordrerequired"))
      .min(6, t("passwordminlength")),
  });
