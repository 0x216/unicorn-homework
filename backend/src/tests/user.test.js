const request = require("supertest");
const DataTypes = require("sequelize");
const app = require("../../app");
const defineUserModel = require("../database/models/user");
const sequelize = require("../database/controller");

beforeAll(async () => {
  try {
    await sequelize.sync({ force: true });
  } catch (error) {
    console.error("database sync error:", error);
  }
});

afterAll(async () => {
  await sequelize.close();
});

const User = new defineUserModel(sequelize, DataTypes);

describe("User API", () => {
  it("should create a new user", async () => {
    const response = await request(app).post("/api/v1/users/register/").send({
      name: "Test User",
      email: "test@example.com",
      password: "Password123!",
    });
    expect(response.statusCode).toBe(201);
    expect(response.body.email).toBe("test@example.com");
    expect(response.body.name).toBe("Test User");
  });
});

describe("User API", () => {
  it("should create a new user without name", async () => {
    const response = await request(app).post("/api/v1/users/register/").send({
      email: "test1@example.com",
      password: "Password123!",
    });
    expect(response.statusCode).toBe(201);
    expect(response.body.email).toBe("test1@example.com");
    expect(response.body.name).toBe(null);
  });
});

describe("User API", () => {
  it("should create and get fail due to incorrect email", async () => {
    const response = await request(app).post("/api/v1/users/register/").send({
      email: "test1@",
      password: "Password123!",
    });
    expect(response.statusCode).toBe(500);
    expect(response.body.message).toBe(
      "Validation error: Validation isEmail on email failed"
    );
  });
});

describe("User API", () => {
  it("should create and get fail due to invalid password", async () => {
    const response = await request(app).post("/api/v1/users/register/").send({
      email: "test@ex.com",
      password: "123",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe(
      "Password does not meet the security requirements."
    );
  });
});

describe("User API", () => {
  it("should log in an existing user", async () => {
    await request(app).post("/api/v1/users/register/").send({
      name: "Login User",
      email: "login@example.com",
      password: "Password123!",
    });

    const response = await request(app).post("/api/v1/users/login/").send({
      email: "login@example.com",
      password: "Password123!",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeDefined();
  });
});

describe("User API", () => {
  it("should log in failed due to bad creditinals", async () => {
    await request(app).post("/api/v1/users/register/").send({
      name: "Login User",
      email: "login@example.com",
      password: "Password123!",
    });

    const response = await request(app).post("/api/v1/users/login/").send({
      email: "login@example.com",
      password: "123",
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Invalid password");
  });
});

describe("User API", () => {
  let token;

  beforeAll(async () => {
    await request(app).post("/api/v1/users/register/").send({
      name: "Me User",
      email: "me@example.com",
      password: "Password123!",
    });

    const resLogin = await request(app).post("/api/v1/users/login/").send({
      email: "me@example.com",
      password: "Password123!",
    });

    token = resLogin.body.token;
  });

  it("should retrieve user information for the logged-in user", async () => {
    const response = await request(app)
      .get("/api/v1/users/me")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.email).toBe("me@example.com");
    expect(response.body.name).toBe("Me User");
  });

  it("should fail to retrieve user information if no token is provided", async () => {
    const response = await request(app).get("/api/v1/users/me");

    expect(response.statusCode).toBe(403);
  });

  it("should fail to retrieve user information if invalid token is provided", async () => {
    const response = await request(app)
      .get("/api/v1/users/me")
      .set("Authorization", "Bearer wrongtoken");

    expect(response.statusCode).toBe(401);
  });
});
