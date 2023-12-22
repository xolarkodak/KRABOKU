import * as yup from "yup";

const ReviewValidation = yup.object().shape({
  comment: yup
    .string()
    .required("Коментар обов'язковий")
    .max(150, "Коментар не повинен перевищувати 150 символів"),
  rating: yup.number().required("Виберіть рейтинг"),
});

const movieValidation = yup.object().shape({
  name: yup
    .string()
    .required("Будь ласка, введіть назву фільму")
    .max(50, "Назва фільму не повинна перевищувати 50 символів"),
  time: yup.number().required("Будь ласка, введіть тривалість фільму"),
  language: yup.string().required("Будь ласка, введіть мову фільму"),
  year: yup.number().required("Будь ласка, введіть рік випуску"),
  category: yup.string().required("Будь ласка, оберіть категорію фільму"),
  desc: yup
    .string()
    .required("Будь ласка, введіть опис фільму")
    .max(1000, "Опис фільму не повинен перевищувати 1000 символів"),
});

export { ReviewValidation, movieValidation };
