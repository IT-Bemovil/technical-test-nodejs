import { deleteImg } from "../helpers/deleteImg.js";

const validateSchema = (schema) => {
  return async (req, res, next) => {
    try {
      // ** validar el req.body con el esquema
      const resultValidation = await schema.validate(req.body, {
        abortEarly: false, // mostrar todos los errores
        stripUnknown: true, // eliminar los campos desconocidos
      });

      req.body = resultValidation;
      next(); // si la validacion fue exitosa, entonces continua con la ejecucion del controlador
    } catch (error) {
      // console.log(error.inner);
      res.status(400).send({
        ok: false,
        message: "Error de validacion",
        errors: error.inner.map((err) => ({
          field: err.path,
          message: err.message,
        })),
      });

      // ** validar si hay una imagen guardada
      // console.log(req.filenameServer);
      if (req.filenameServer) {
        await deleteImg(req.filenameServer);
      }
    }
  };
};

export default validateSchema;
