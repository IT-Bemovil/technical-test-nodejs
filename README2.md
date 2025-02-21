### Requerimientos

- Node.js
- NPM

### Iniciación del proyecto

1. Abrir una terminal en la carpeta del proyecto.
2. Ejecutar `npm install` para instalar las dependencias.
3. Ejecutar `npm run start` para iniciar el servidor.
4. La primera petición que se realice a la API debe ser a `/auth/register` para registrar un usuario.
5. Una vez registrado, se debe realizar una petición a `/auth/login` para autenticarse, recibirá un token JWT en la respuesta, el cuál debe ser utilizado en las siguientes peticiones como Authorization.
6. Realice las peticiones a `/tasks` para crear, leer, actualizar y eliminar tareas.

### Dependencias

- `@sequelize/core` y `@sequelize/sqlite3` para la base de datos, los modelos y las clases de los errores posibles de la misma.
- `cors` para permitir las peticiones de origen cruzada.
- `dotenv` para cargar las variables de entorno.
- `express` para crear la una RESTful API.
- `jsonwebtoken` para generar y validar tokens JWT.
- `nodemon` para iniciar el servidor en modo de desarrollo y aplicar cambios al guardar archivos.
- `zod` para validar los datos enviados por el usuario en la petición http.

### Notas:

- Entiendo que en un proyecto real se deberían hacer commits individuales para cada funcionalidad, pero en esta prueba he hecho realmente muy pocos commits muy de prisa por cuestiones de nervios y tiempo.
- El archivo `.env` contiene las variables de entorno que se utilizarán en el proyecto, debería estar listado en el archivo.gitignore, sin embargo no lo hago ya que es una prueba y se utilizará como tal, nunca en producción.
- El proyecto busca ser escalable y seguir buenas prácticas, por lo que se ha estructurado de forma modular para evitar acoplamiento, además se ha implementado un error manejador para manejar errores de manera centralizada y mantener el código limpio y una validación robusta de datos.
- En la raíz del proyecto se encuentra el archivo `Bemovil.postman_collection`, este archivo contiene todas las peticiones HTTP que se realiza en el proyecto, se recomienda utilizar Postman para realizar las pruebas importando el archivo. `Recuerde que el token JWT debe ser insertado en la cabecera de la petición para la ruta /tasks`
