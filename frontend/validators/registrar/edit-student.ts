// validationSchemas.ts
import * as yup from "yup";

export const editStudentSchema = (t: (key: string) => string) =>
  yup.object({
    card_number: yup
      .string()
      .required(t("cardnumberrequired"))
      .min(8, t("cardnumberminlength"))
      .max(8, t("cardnumbermaxlength")),
    status: yup.string().required("statusrequired"),
    photo: yup.string().required("photorequired"),
  });
