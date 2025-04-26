require('dotenv').config();

const TOKEN_SECRET = process.env.TOKEN_SECRET;

if (!TOKEN_SECRET) {
  throw new Error("TOKEN_SECRET no está definido en el archivo .env");
} else {
  console.log("Token declarado correctamente")
}

module.exports = TOKEN_SECRET;