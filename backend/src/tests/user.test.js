const request = require("supertest");
const User = require("../database/models/user");
const app = require("../../app");
const sequelize = require("../database/controller");

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe("User Registration and Login API", () => {
  const userData = {
    name: "Test User",
    email: "test@example.com",
    password: "Password123!",
  };

  it("should create a new user", async () => {
    const response = await request(app)
      .post("/api/v1/users/register/")
      .send(userData);
    expect(response.statusCode).toBe(201);
    expect(response.body.email).toBe(userData.email);
    expect(response.body.name).toBe(userData.name);
  });

  it("should log in an existing user", async () => {
    const response = await request(app).post("/api/v1/users/login/").send({
      email: userData.email,
      password: userData.password,
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeDefined();
  });
});

describe("User Information API", () => {
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

describe("User Update and Delete API", () => {
  let userToken, superuserToken;

  beforeAll(async () => {
    await request(app).post("/api/v1/users/register").send({
      name: "Regular User",
      email: "regular@example.com",
      password: "Password123!",
    });

    await request(app).post("/api/v1/users/register").send({
      name: "Superuser",
      email: "superuser@example.com",
      password: "Password123!",
    });

    const foundUser = await User.findOne({
      where: { email: "superuser@example.com" },
    });
    foundUser.isSuperuser = true;
    await foundUser.save();

    const userLoginResponse = await request(app)
      .post("/api/v1/users/login")
      .send({
        email: "regular@example.com",
        password: "Password123!",
      });
    userToken = userLoginResponse.body.token;

    const superuserLoginResponse = await request(app)
      .post("/api/v1/users/login")
      .send({
        email: "superuser@example.com",
        password: "Password123!",
      });
    superuserToken = superuserLoginResponse.body.token;
  });
  it("should update user name", async () => {
    const response = await request(app)
      .put("/api/v1/users/update/")
      .set("Authorization", `Bearer ${userToken}`)
      .send({ name: "Updated User" });
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe("Updated User");
  });

  it("should delete a user as superuser", async () => {
    const response = await request(app)
      .delete("/api/v1/users/delete/1")
      .set("Authorization", `Bearer ${superuserToken}`);
    expect(response.statusCode).toBe(200);
  });

  it("should prevent non-superusers from deleting a user", async () => {
    const response = await request(app)
      .delete("/api/v1/users/delete/2")
      .set("Authorization", `Bearer ${userToken}`);
    expect(response.statusCode).toBe(403);
  });
});
