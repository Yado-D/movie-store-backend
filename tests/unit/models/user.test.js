const User = require("../../../models/user_model");
const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");

describe("User generateAuthToken - ", () => {
  it("should return a valid JWT", () => {
    const payload = {
      _id: new mongoose.Types.ObjectId().toHexString(),
      isAdmin: true,
    };
    const user = new User(payload);
    const token = user.GenerateAuthToken();
    const decoded = jwt.verify(token, config.get("mail.password"));
    expect(decoded).toMatchObject(payload);
  });
});
