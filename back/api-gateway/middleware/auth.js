const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    // console.log('decodedToken', decodedToken)
    const user = decodedToken.sub;
    req.auth = {
      user,
    };
    // console.log(req.auth)
    next();
  } catch (error) {
    res.status(401).json({ message: "Token invalid" });
  }
};
