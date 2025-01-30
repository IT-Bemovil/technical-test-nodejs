import authController from "../../controllers/auth.controller";
import { db } from "../../db/models";
import { token } from "morgan";

describe("Auth Controller", () => {
  let mockRequest: any;
  let mockResponse: any;

  beforeEach(() => {
    mockRequest = {
      body: {
        email: "test@test.com",
        password: "123456",
      },
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe("register", () => {
    it("should create a new user successfully", async () => {
      await authController.register(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "User registered successfully",
      });
    });
  });

  describe("login", () => {
    it("should login a user successfully", async () => {
      await authController.login(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        token: expect.any(String),
      });

      await db.user.destroy({ where: { email: mockRequest.body.email } });
    });
  });
});
