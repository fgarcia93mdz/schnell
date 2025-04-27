require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET no está definido en el archivo .env");
} else {
  console.log("Token declarado correctamente")
}

module.exports = JWT_SECRET;