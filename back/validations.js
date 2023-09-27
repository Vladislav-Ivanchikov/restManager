import { body } from "express-validator";

export const registerValidation = [
  body("email", "Неверно введен Email.").isEmail(),
  body("login", "Логин должен состоять минимум из 3х символов.").isLength({
    min: 3,
  }),
  body(
    "password",
    "Пароль должен содержать заглавную букву, цифру и спец. символ. Мин длинна - 4.",
  ).isLength({ min: 4 }),
  body("avatarURL", "Тут должна быть ссылка на аватар.").optional().isURL(),
];

export const loginValidation = [
  body("email", "Неверно введен Email.").isEmail(),
];

export const restValidation = [
  body("name", "Слишком короткое или слишком длинное название.")
    .isString()
    .isLength({
      min: 2,
      max: 32,
    }),
  body("description", "Слишком короткое описание. От 32 символов.")
    .isString()
    .isLength({
      min: 30,
    }),
  body("type", "Выберите тип заведения").isString(),
  body("imageURL", "Ссылка на вашу картинку").optional().isString(),
  body("tags", "Укажите тэги").optional().isArray(),
];

export const menuValidation = [
  body("name", "Слишком короткое или слишком длинное название.")
    .isString()
    .isLength({
      min: 2,
      max: 32,
    }),
  body("category", "Выберите категорию блюда").isString(),
  body("ingredients", "Укажите ингредиенты").isArray(),
  body("description", "Слишком короткое описание. От 32 символов.")
    .optional()
    .isString()
    .isLength({
      min: 32,
    }),
  body("imageURL", "Ссылка на вашу картинку").optional().isString(),
];
