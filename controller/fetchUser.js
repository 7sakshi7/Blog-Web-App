const jwt = require("jsonwebtoken");
const JWT_TOKEN = "mysecretkey";

const fetchUser = (req, res, next) => {
  const token = req.header("authToken");

  if (!token) {
    return res
      .status(401)
      .send({ error: "Please authenticate using a valid token" });
  }

  try {
      const data = jwt.verify(token,JWT_TOKEN);
      console.log(data);
      req.user = data.user;
      next();
  } catch (err) {
    console.log(err);
    res.status(401).send({error:"Please authenticate using a valid token"});
  }
};

module.exports = fetchUser;
