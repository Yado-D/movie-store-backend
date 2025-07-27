const jwt = require("jsonwebtoken");
const config = require("config");
const authdebugger = require("debug")("app:auth");

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token || token === null)
    throw new Error("Access Denied! you don't  have the right to access.");

  try {
    const result = jwt.verify(token, config.get("mail.password"));
    authdebugger("user : ", result);

    //delete only for admin 
    if (req.method === "DELETE" && !result.isAdmin) {
      return res
        .status(400)
        .send("Access Denied! only Authorized Admin access this page.");
    }

    res.user = result;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};
