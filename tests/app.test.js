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

