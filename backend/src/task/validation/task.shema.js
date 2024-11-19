import * as Yup from "yup";

export const createTaskSchema = Yup.object().shape({
  title: Yup.string().required("El titulo es requerido"),
  // ** segun las instrucciones la descripcion no es obligatoria
  description: Yup.string(),
});
