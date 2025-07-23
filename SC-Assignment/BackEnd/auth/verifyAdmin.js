const jwt = require('jsonwebtoken');
const config = require('../config.js'); // adjust if your config path is different

function verifyAdmin(req, res, next) {
  const authHeader = req.headers['authorization'];
  console.log("Auth Header:", authHeader);
  // console.log("Token:", token);
  // Check if header exists and has Bearer token
  if (!authHeader || !authHeader.includes('Bearer ')) {
    console.log('No token provided');
    return res.status(401).json({ auth: false, message: 'No token provided' });
  }

  const token = authHeader.split('Bearer ')[1];

  jwt.verify(token, config.key, (err, decoded) => {
    if (err) {    
      return res.status(403).json({ auth: false, message: 'Failed to authenticate token' });
    }


    // Store decoded info in request
    req.userid = decoded.userid;
    req.type = decoded.type;
    next();
  });
}

module.exports = verifyAdmin;
