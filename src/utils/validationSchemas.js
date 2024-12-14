import * as Yup from "yup";

export const validationSchema = Yup.object({
  dataType: Yup.string().required("Data type is required"),
  startDate: Yup.date()
    .required("Start date is required")
    .typeError("Invalid date format"),
  endDate: Yup.date()
    .required("End date is required")
    .typeError("Invalid date format")
    .min(Yup.ref("startDate"), "End date cannot be before start date"),
  chapter: Yup.string().required("Chapter is required"),
  searchType: Yup.string().required("Search type is required"),
  searchValue: Yup.string()
    .required("Search value is required")
    .min(3, "Search value must be at least 3 characters"),
});
