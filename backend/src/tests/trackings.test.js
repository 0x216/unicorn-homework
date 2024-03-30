const request = require("supertest");
const app = require("../../app");
const sequelize = require("../database/controller");

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe("Tracking Create and Get", () => {
  let token;
  let userId;

  const trackingData = {
    cigarettesPerDay: 5,
    cost: 23.5,
  };

  const userData = {
    name: "Test User",
    email: "test@example.com",
    password: "Password123!",
  };

  beforeAll(async () => {
    const resRegister = await request(app)
      .post("/api/v1/users/register/")
      .send({
        name: userData.name,
        email: userData.email,
        password: userData.password,
      });
    userId = resRegister.body.id;

    const resLogin = await request(app).post("/api/v1/users/login/").send({
      email: userData.email,
      password: userData.password,
    });
    token = resLogin.body.token;
  });

  it("should start a new tracking", async () => {
    const response = await request(app)
      .post("/api/v1/tracking/create/")
      .set("Authorization", `Bearer ${token}`)
      .send(trackingData);
    expect(response.statusCode).toBe(201);
    expect(response.body.userId).toBe(userId);
    expect(response.body.id).toBe(response.body.savings.trackingId);
  });

  it("should get the tracking information", async () => {
    const response = await request(app)
      .get("/api/v1/tracking/")
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.userId).toBe(userId);
    expect(response.body.id).toBe(response.body.savings.trackingId);
  });

  it("should not create a new tracking if one already exists", async () => {
    const response = await request(app)
      .post("/api/v1/tracking/create/")
      .set("Authorization", `Bearer ${token}`)
      .send(trackingData);
    expect(response.statusCode).toBe(409);
    expect(response.body.message).toBe("Tracking already exists");
  });
});
