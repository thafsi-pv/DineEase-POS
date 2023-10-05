const jwt = require("jsonwebtoken");

exports.checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(400).json({ message: "Access Denied!" });
    }

    //split token
    const tokenParts = token.split(" ");
    if (tokenParts.length != 2 && tokenParts[0] !== "Bearer") {
      return res.status(400).json({ message: "Invalid token format" });
    }

    const authToken = tokenParts[1];
    const verifyToken = jwt.verify(authToken, process.env.JWT_SECRET_KEY);
    req.userId = verifyToken._id;
    next();
  } catch (error) {
    return res.status(400).json({ message: "You are unauthorized" });
  }
};
