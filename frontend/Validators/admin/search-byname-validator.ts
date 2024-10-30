// validationSchemas.ts
import * as yup from "yup";

export const createSearchByNameSchema = (t: (key: string) => string) =>
  yup.object({
    name: yup.string().required(t("searchbynamerequired")),
  });
