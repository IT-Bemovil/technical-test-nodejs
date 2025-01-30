# Technical Test Node.js

Este proyecto es una aplicación Node.js que implementa un sistema de autenticación y gestión de tareas. Utiliza Express, TypeScript, Docker y Terraform para el despliegue en AWS.

## Requisitos previos

- Node.js (v14 o superior)
- pnpm (v6 o superior)
- Docker
- Terraform
- AWS CLI

## Ejecutar en local

1. Clona el repositorio:

   ```bash
   git clone https://github.com/andycr95/technical-test-nodejs.git
   cd technical-test-nodejs

   ```

2. Instalar dependencias:
   ```
   pnpm install
   ```

### Configuración

1. Crear un archivo .env en la raíz del proyecto con las siguientes variables:

```bash
PORT=3000
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASS=tu_contraseña
DB_NAME=tu_base_de_datos
```

2. Configurar las credenciales de AWS en ~/.aws/credentials:

```bash
[default]
aws_access_key_id = TU_ACCESS_KEY
aws_secret_access_key = TU_SECRET_KEY
```

## Ejecución

1. Compilar el proyecto:

   ```
   pnpm build
   ```

2. Inicia la aplicación:
   ```
   pnpm start
   ```

N: La aplicación estará disponible en http://localhost:3000.

## Tests

1. Para ejecutar pruebas unitarias y de integración:
   ```bash
   pnpm test
   ```

## Despliegue con Docker

1. Construye la imagen Docker:

   ```bash
   pnpm run docker:build
   ```

2. Ejecutar el contenedor:

   ```bash
   pnpm run docker:run
   ```

3. Para ejecutar ambos contenedores:
   ```bash
   docker compose up -d
   ```

## Despliegue con Terraform en AWS

1. Inicializar Terraform:

   ```
   terraform init
   ```

2. Verificrar el plan de ejecución:

   ```
   terraform plan
   ```

3. Aplicar la configuracion:

   ```
   terraform apply
   ```

4. Construir y subir la imagen Docker a ECR:
   ```
   chmod +x build_and_push.sh
   ./build_and_push.sh
   ```

## Documentación API con Swagger

La documentación de la API está disponible en http://localhost:3000/api-docs.
