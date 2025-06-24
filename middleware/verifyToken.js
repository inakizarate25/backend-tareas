const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token)
    return res
      .status(401)
      .json({ msg: "Acceso denegado. No se proporcionó token." });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // añadimos el id del usuario a la req
    next();
  } catch (err) {
    res.status(400).json({ msg: "Token no válido." });
  }
};

module.exports = verifyToken;
