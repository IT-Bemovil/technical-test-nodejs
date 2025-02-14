# Test Tecnico NodeJS

Este proyecto es una solución basada en Node.js y Express para la gestión de APIs RESTful. A continuación se detallan las instrucciones para ejecutar el proyecto y la descripción de las dependencias utilizadas.

---

## Instrucciones para ejecutar el proyecto

### Requisitos Previos

- **Node.js**: Asegúrate de tener instalado Node.js (se recomienda la versión >= 14).
- **npm**: Viene instalado con Node.js.
- **PostgreSQL**: El proyecto utiliza PostgreSQL como base de datos, por lo que deberás tenerlo instalado y configurado.

### Pasos para la instalación y ejecución

1. **Clonar el repositorio**

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd technical-test-nodejs

## Pasos para la instalación y ejecución

### 2. Instalar las dependencias

Ejecuta el siguiente comando para instalar todas las dependencias del proyecto:

```bash
npm install
```

### 3. Configurar el archivo de variables de entorno

Crea un archivo `.env` en la raíz del proyecto y define las siguientes variables (ajusta los valores según tu entorno):

```env
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_HOST=localhost
DB_DATABASE=nombre_de_tu_base_de_datos
JWT_SECRET=tu_clave_secreta
```

### 4. Ejecutar el proyecto

- Para **desarrollo** (con recarga automática gracias a Nodemon):

```bash
  npm run dev
```
- Para **producion** :


```bash
  npm start
```


