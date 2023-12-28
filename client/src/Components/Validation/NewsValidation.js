import * as yup from "yup";

const ReviewValidation = yup.object().shape({
  comment: yup
    .string()
    .required("Коментар обов'язковий")
    .max(150, "Коментар не повинен перевищувати 150 символів"),
  rating: yup.number().required("Виберіть рейтинг"),
});

const newsValidation = yup.object().shape({
  name: yup
    .string()
    .required("Будь ласка, введіть назву новини")
    .max(50, "Назва новини не повинна перевищувати 50 символів"),
  time: yup.number().required("Будь ласка, введіть тривалість читання новини"),
  language: yup.string().required("Будь ласка, введіть мову новини"),
  year: yup.number().required("Будь ласка, введіть дату виходу новини"),
  category: yup.string().required("Будь ласка, оберіть тег новини"),
  desc: yup
    .string()
    .required("Будь ласка, введіть опис новини")
    .max(1000, "Опис новини не повинен перевищувати 1000 символів"),
});

export { ReviewValidation, newsValidation };
