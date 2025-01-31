import request from "supertest";
import express from "express";
import { db } from "../../db/models";
import { setupMiddleware } from "../../middlewares";
import { setupRoutes } from "../../routes";

const app = express();
setupMiddleware(app);
setupRoutes(app);

describe("Auth Integration Tests", () => {
  describe("POST /auth/register", () => {
    it("should register a new user", async () => {
      const response = await request(app).post("/auth/register").send({
        email: "testInt@test.com",
        password: "123456",
      });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty(
        "message",
        "User registered successfully"
      );
    });
  });

  describe("POST /auth/login", () => {
    it("should login a user", async () => {
      const response = await request(app).post("/auth/login").send({
        email: "testInt@test.com",
        password: "123456",
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token");

      await db.user.destroy({
        where: {
          email: "testInt@test.com",
        },
      });
    });
  });
});
