const jwt = require("jsonwebtoken");

exports.checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(400).json({ message: "Access Denied!" });
    }
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = verifyToken._id;
    next();
  } catch (error) {
    return res.status(400).json({ message: "You are unauthorized" });
  }
};
