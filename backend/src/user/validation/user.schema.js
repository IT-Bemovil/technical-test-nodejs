// user.schema.js

import * as Yup from "yup";

export const createUserSchema = Yup.object().shape({
  email: Yup.string().email("Email invalido").required("El email es requerido"),

  password: Yup.string()
    .required("password es requerido")
    .min(6, "El password debe tener al menos 6 caracteres"),
});

export const loginUserSchema = Yup.object().shape({
  email: Yup.string().email("Email invalido").required("El email es requerido"),

  password: Yup.string()
    .required("password es requerido")
    .min(6, "El password debe tener al menos 6 caracteres"),
});
