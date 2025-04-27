const createError = require("http-errors");
const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const dotenv = require("dotenv");
dotenv.config();
const publicPath = path.resolve("../public");
const methodOverride = require("method-override");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");

// Swagger
// const { swaggerDocs } = require("./swagger/V1/swagger_v1.js");

// Socket.IO
const { initialize } = require("./config/socket");

// Módulos alias
require('module-alias/register');

// Rutas agrupadas

const {
  usuarioRoutes,
  autentificacionRoutes,
  /* empresaRoutes,
  cotizacionRoutes,
  ofertaRoutes,
  membresiaRoutes,
  notificacionRoutes
  */
} = require("./routes");


console.log("Servidor Schnell iniciando...");

// Swagger Docs
// swaggerDocs(app, process.env.PORT_DEV);

// Middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.static(publicPath));

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.resolve("src/views"));

// Sessions
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

// Rutas API
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/autentificacion", autentificacionRoutes);
/*
app.use("/api/empresas", empresaRoutes);
app.use("/api/cotizaciones", cotizacionRoutes);
app.use("/api/ofertas", ofertaRoutes);
app.use("/api/membresias", membresiaRoutes);
app.use("/api/notificaciones", notificacionRoutes);
*/

// Test de socket.io
app.get("/test-socket", (req, res) => {
  res.sendFile(path.join(__dirname, "test-socket.html"));
});

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404, "Not Found"));
});

// Error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: { message: err.message } });
});

// Configuración del server
const port = process.env.NODE_ENV === 'development' ? process.env.PORT_DEV : process.env.PORT_PROD;
const host = process.env.NODE_ENV === 'development' ? process.env.NAME_HOST : process.env.NAME_HOST_PROD;

let server = http.createServer(app);

// Inicializar Socket.IO
const io = initialize(server);

// Escuchar servidor
server.listen(port, () => {
  console.log(`Servidor escuchando en http://${host}:${port}`);
});

module.exports = { app, io };
