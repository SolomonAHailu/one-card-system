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

export const createStudentSchema = (t: (key: string) => string) =>
  yup.object({
    id: yup.number().optional(),
    first_name: yup.string().required(t("firstnamerequired")),
    father_name: yup.string().required(t("fathernamerequired")),
    grand_father_name: yup.string().required(t("grandfathernamerequired")),
    email: yup.string().email(t("emailinvalid")).required(t("emailrequired")),
    phone: yup
      .string()
      .matches(/^0\d{9}$/, t("phoneinvalid"))
      .required(t("phonerequired")),
    sex: yup
      .string()
      .oneOf(["Male", "Female"], t("sexinvalid"))
      .required(t("sexrequired")),
    date_of_birth: yup
      .date()
      .max(new Date(), t("dateofbirthinvalid"))
      .required(t("dateofbirthrequired")),
    program: yup.string().required(t("programrequired")),
    section: yup.string().required(t("sectionrequired")),
    year: yup.number().min(1, t("yearinvalid")).required(t("yearrequired")),
    semester: yup
      .number()
      .min(1, t("semesterinvalid"))
      .required(t("semesterrequired")),
    religion: yup.string().required(t("religionrequired")),
    status: yup
      .string()
      .oneOf(["Active", "Inactive"], t("statusinvalid"))
      .required(t("statusrequired")),
    student_id: yup.string().required(t("studentidrequired")),
    library_id: yup.number().min(1, t("libraryidinvalid")).nullable(),
    cafeteria_id: yup.number().min(1, t("cafeteriaidinvalid")).nullable(),
    dormitory_id: yup.number().min(1, t("dormitoryidinvalid")).nullable(),
    registered_by_id: yup.number().min(1, t("registeredbyrequired")).nullable(),
  });

export type createStudentSchemaType = yup.InferType<
  ReturnType<typeof createStudentSchema>
>;
