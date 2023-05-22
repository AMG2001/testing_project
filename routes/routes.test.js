// routes.test.js
const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
const { signup } = require("./routes");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.post("/signup", signup);

describe("POST /signup", () => {
  it("should create a new user and redirect to /users", async () => {
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

});