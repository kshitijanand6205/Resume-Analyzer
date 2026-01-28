import jwt from 'jsonwebtoken';

export default function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ 
        success: false,
        message: "Access denied. No token provided." 
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: "Access denied. Invalid token format." 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (!decoded || !decoded.id) {
      return res.status(401).json({ 
        success: false,
        message: "Invalid token payload." 
      });
    }

    req.user = {
      id: decoded.id,
      email: decoded.email
    };
    
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false,
        message: "Token has expired." 
      });
    }
    
    return res.status(401).json({ 
      success: false,
      message: "Invalid token." 
    });
  }
}
