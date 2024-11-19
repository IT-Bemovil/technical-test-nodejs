# Backend con Express

Este proyecto es un backend construido con **Express** que utiliza PostgreSQL como base de datos. Está diseñado para gestionar datos, realizar validaciones y manejar autenticación de manera eficiente.

---

## Requisitos Previos

Asegúrate de tener instalado lo siguiente:

- **Node.js** (versión 14 o superior recomendada)
- **PostgreSQL** instalado y configurado

---

## Configuración Inicial

### 1. Crear la base de datos

Crea una base de datos en PostgreSQL con el nombre: prueba

### 2. Configurar las credenciales de la base de datos

1. Navega a la carpeta raíz del proyecto:  
   ```bash
   cd backend

2. Abre el archivo database.js, ubicado dentro de la carpeta backend.
3. Actualiza las credenciales de conexión de la base de datos con tu configuración local, incluyendo:
- Nombre de usuario
- Contraseña
- Puerto (si utilizas un puerto diferente al predeterminado)

## Instalación de Dependencias
- En la carpeta backend, instala las dependencias ejecutando el siguiente comando:
   ```bash
   npm install

## Scripts Disponibles

1. Ejecutar en Modo Desarrollo
    ```bash
   npm run dev

2. Ejecutar en Modo Produccion
    ```bash
   npm run start


## Paquetes Utilizados
## Este proyecto utiliza las siguientes librerías:

- Validaciones: Yup
Para realizar validaciones robustas de datos en las entradas y salidas.

- Manejo de peticiones en consola: Morgan
Para registrar las solicitudes HTTP en la consola de manera legible.

- Autenticación y autorización: jsonwebtoken
Para gestionar tokens JWT en el proceso de autenticación.

- Encriptación de contraseñas: bcrypt
Para asegurar las contraseñas almacenadas en la base de datos.

- ORM: Sequelize
Para la gestión de modelos y consultas en la base de datos PostgreSQL.

- Notas Adicionales
Asegúrate de que el servicio de PostgreSQL esté activo y configurado correctamente.
Si experimentas problemas, revisa los logs de la consola y las configuraciones en el archivo database.js.


## Estructura del Proyecto
```
└── 📁backend
    └── 📁src
        └── 📁config
            └── cloudinary.config.js
        └── 📁helpers
            └── cloudinary.actions.js
            └── deleteImg.js
            └── encryptPassword.js
            └── generateJwt.js
            └── response.js
        └── 📁middlewares
            └── auth.js
            └── validateSchema.js
        └── 📁task
            └── 📁controller
                └── task.controller.js
            └── 📁model
                └── task.model.js
            └── 📁routes
                └── task.routes.js
            └── 📁services
                └── task.service.js
            └── 📁validation
                └── task.shema.js
        └── 📁user
            └── 📁controller
                └── user.controller.js
            └── 📁models
                └── user.model.js
            └── 📁routes
                └── user.routes.js
            └── 📁services
                └── user.services.js
            └── 📁validation
                └── user.schema.js
        └── database.js
        └── index.js
    └── .env
    └── .gitignore
    └── package-lock.json
    └── package.json
```