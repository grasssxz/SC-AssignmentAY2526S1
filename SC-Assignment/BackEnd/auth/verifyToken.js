var jwt = require("jsonwebtoken");
var config = require("../config.js");

function verifyToken(req, res, next) {
  console.log(req.headers);

  var token = req.headers["authorization"]; //retrieve authorization header's content
  console.log(token);

  if (!token || !token.includes("Bearer")) {
    //process the token

    res.status(403);
    return res.send({ auth: "false", message: "Not authorized!" });
  } else {
    token = token.split("Bearer ")[1]; //obtain the token's value
    //console.log(token);
    jwt.verify(token, config.key, function (err, decoded) {
      //verify token
      if (err) {
        res.status(403);
        return res.json({ auth: false, message: "Not authorized!" });
      } else {
        console.log(decoded);
        req.user = decoded;

        req.type = decoded.type; //decode the role and store in req for use
        next();
      }
    });
  }
}

module.exports = verifyToken;
