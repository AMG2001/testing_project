// e2e.test.js
const request = require("supertest");
const app = require("./app");

describe("User management E2E tests", () => {
  it("renders welcome page", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain("welcome_page");
  });

  it("renders signup page", async () => {
    const res = await request(app).get("/signup");
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain("signup");
  });

  it("successfully signs up a user", async () => {
    const newUser = {
      first_name: "John",
      last_name: "Doe",
      user_name: "johndoe",
      password: "password123",
    };

    const res = await request(app).post("/signup").send(newUser);
    expect(res.statusCode).toBe(302);
    expect(res.header.location).toBe("/users");
  });

  it("renders login page", async () => {
    const res = await request(app).get("/login");
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain("login");
  });

  it("successfully logs in a user", async () => {
    const credentials = {
      user_name: "johndoe",
      password: "password123",
    };

    const res = await request(app).post("/login").send(credentials);
    expect(res.statusCode).toBe(302);
    expect(res.header.location).toBe("/users");
  });

  it("fails to log in with incorrect credentials", async () => {
    const credentials = {
      user_name: "johndoe",
      password: "wrongpassword",
    };

    const res = await request(app).post("/login").send(credentials);
    expect(res.statusCode).toBe(401);
  });

  it("renders users page", async () => {
    const res = await request(app).get("/users");
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain("users");
  });

  // Just add any user id form firestore and try to delete it 
//   it("deletes a user", async () => {
//     const userId = "USER_ID";
//     const res = await request(app).delete(`/delete-user/${userId}`);
//     expect(res.statusCode).toBe(200);
//   });
});