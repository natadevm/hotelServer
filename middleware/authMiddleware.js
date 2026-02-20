const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer TOKEN
  if (!token) return res.status(401).json({ message: "No token, unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden, not admin" });
    }
    next();
  } catch (err) {
    res.status(401).json({ message: "Token invalid" });
  }
};

module.exports = authMiddleware;