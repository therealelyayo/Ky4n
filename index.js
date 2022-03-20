/**
 * @author: @aqu4x0
 * @license: MIT
 */

const express = require("express"),
  session = require("express-session"),
  { join } = require("path"),
  { json, urlencoded } = require("body-parser"),
  { connect } = require("mongoose"),
  { Auth } = require("./settings.json"),
  PORT = process.env.PORT || 3000,
  APP = express();

/** @description: Ahora la estructura principal del servidor [Metodo: IIFE]: */

(async function () {
  if (!Auth["MongoURI"] && !Auth["Password"]) {
    throw new Error("No se ha configurado la base de datos");
  } else {
    await connect(Auth["MongoURI"], {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
      .then(() => {
        console.log(`[MongoDB] :: Conectado exitosamente a la base de datos.`);
      })
      .catch((err) => {
        console.log(
          `[MongoDB] :: Error al conectar a la base de datos: ${err}`
        );
      });
    APP.use(
      session({
        secret: "secret",
        resave: false,
        saveUninitialized: false,
      })
    );
    APP.set("views", join(__dirname, "views"));
    APP.set("view engine", "ejs");
    APP.use(express.static("public"));
    APP.use(json());

    APP.use(
      urlencoded({
        extended: false,
      })
    );

    APP.use((request, response, next) => {
      request.pass = Auth["Password"];
      next();
    });

    APP.use("/", require("./src/router/auth"));
    APP.use("/v1/api", require("./src/router/API"));

    APP.get("*", async (request, response) => {
      response.status(404).render("404", {
        title: "Ky4n | 404 Error",
      });
    });

    APP.listen(PORT, () => {
      console.clear();
      console.log(`[SERVER] :: Servidor iniciado en el puerto ${PORT}`);
    });
  }
})();
