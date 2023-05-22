const request = require("supertest");
const app = require("../app");
const { expect } = require("chai");

// Your existing test cases

describe("GET /", () => {
  it("should render the welcome page", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).to.equal(200);
    expect(res.text).to.include("Welcome");
  });
});

describe("GET /signup", () => {
  it("should render the signup page", async () => {
    const res = await request(app).get("/signup");
    expect(res.statusCode).to.equal(200);
    expect(res.text).to.include("Sign Up");
  });
});

describe('POST signup',()=>{
 it('error while Post request in Signup page', async ()=>{
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
