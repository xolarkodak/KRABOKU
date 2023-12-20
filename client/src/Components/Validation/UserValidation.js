import * as yup from 'yup';

const LoginValidation = yup.object().shape({
  email: yup.string().email().required("Пошта є обов'язковою").trim(),
  password: yup
    .string()
    .required("Пароль є обов'язковим")
    .min(6, 'Пароль повинен містити принаймні 6 символів')
    .max(20, 'Пароль повинен бути менше 20 символів')
    .matches(/(?=.*[0-9])/, 'Пароль повинен містити цифру'),
});

const RegisterValidation = yup.object().shape({
  email: yup.string().email().required("Пошта є обов'язковою").trim(),
  password: yup
    .string()
    .required("Пароль є обов'язковим")
    .min(6, 'Пароль повинен містити принаймні 6 символів')
    .max(20, 'Пароль повинен бути менше 20 символів')
    .matches(/(?=.*[0-9])/, 'Пароль повинен містити цифру'),
  fullName: yup
    .string()
    .required("Повне ім'я є обов'язковим")
    .max(20, "Повне ім'я повинно бути менше 20 символів")
    .matches(/^[a-zA-Z ]*$/, "Повне ім'я повинно містити лише літери"),
});

const ProfileValidation = yup.object().shape({
  fullName: yup
    .string()
    .required("Повне ім'я є обов'язковим")
    .max(20, "Повне ім'я повинно бути менше 20 символів")
    .matches(/^[a-zA-Z ]*$/, "Повне ім'я повинно містити лише літери"),
  email: yup
    .string()
    .email()
    .required("Обов'язкова наявність електронної пошти")
    .trim(),
});

export { LoginValidation, RegisterValidation, ProfileValidation };
