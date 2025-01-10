const User = require("../models/user");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1]; 

    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
        const foundUser = await User.findById(decoded.id).select('-password'); 
        if (!foundUser) {
          return res.status(404).json({ message: 'User not found' });
        }
        req.user = foundUser;
        next(); 
      } else {
        return res.status(401).json({ message: 'No token provided' });
      }
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Invalid token' });
    }
  } else {
    return res.status(401).json({ message: 'Authorization header not provided' });
  }
};

module.exports = { authMiddleware };
