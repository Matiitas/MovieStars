const jwt = require("jsonwebtoken");

const authenticateWithToken = (req, res, next) => {
  const authorizationHeader = req.headers["authorization"];
  let token;
  if (authorizationHeader) {
    token = authorizationHeader.split(" ")[1];
  }
  if (token) {
    jwt.verify(token, process.env.SECRET_JWT, (err, decoded) => {
      if (err) {
        res.json({ message: "Token not match" });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  } else {
    res.json({ message: "User not logged" });
  }
};

module.exports = authenticateWithToken;

// Para verificar si está logueado y con token valido,
// para validar si puede o no hacer el request
