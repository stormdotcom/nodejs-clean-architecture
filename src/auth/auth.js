import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET || "your-secret-key";

// Middleware to authenticate requests
export const authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ success: false, message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).json({ success: false, message: "Invalid token." });
  }
};

// Middleware to authorize based on roles
export const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: "Access denied." });
    }
    next();
  };
};
