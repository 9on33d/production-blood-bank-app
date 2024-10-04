const JWT = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    
    // Check if the authorization header exists
    if (!authHeader) {
      return res.status(401).send({
        success: false,
        message: "Authorization header missing",
      });
    }

    // Split the token if the header is in the correct format
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).send({
        success: false,
        message: "Token missing from authorization header",
      });
    }

    // Verify the token using JWT
    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "Authentication failed",
        });
      } else {
        req.body.userId = decode.userId;
        next();
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      success: false,
      error,
      message: "Authentication failed",
    });
  }
};
