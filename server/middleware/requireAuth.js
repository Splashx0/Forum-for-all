const jwt = require("jsonwebtoken");
const User = require("../models/user").default;

const requireAuth = async (req, res, next) => {
  /*verify auth*/
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }
  const token = authorization.split(" ")[1];
  try {
    const { username } = jwt.verify(token, process.env.SECRET);
    req.user = await User.findOne({ username }).select("username");
    next(); //fire next handler
  } catch (error) {
    res.status(404).json({ error: "request is not authorized" });
  }
};
module.exports = requireAuth;
