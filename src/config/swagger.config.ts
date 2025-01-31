import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Todo API Documentation",
      version: "1.0.0",
      description: "Documentation for Todo API",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/controllers/*.ts", "./dist/src/controllers/*.js"],
};

export const swaggerSpec = swaggerJsdoc(options);
