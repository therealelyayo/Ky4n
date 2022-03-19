/**
 * @author: @aqu4x0
 * @license: MIT
 */

const express = require("express"),
  flash = require("express-flash"),
  router = express.Router(),
  database = require("../models/post.schema");

/** @description: Ahora la estructura principal del auth: */

router.get("/", async (request, response) => {
  const db = await (await database.find()).length;
  if (request.session.isAuth == true) {
    response.status(200).render("home", {
      title: "Ky4n | Home",
      db,
      session: request.session,
    });
  } else {
    response.status(200).render("login", {
      title: "Ky4n | Login",
      session: request.session,
    });
  }
});

router.get("/infectados", async (request, response) => {
  if (request.session.isAuth == false || request.session.isAuth == undefined)
    return await response.redirect("/");
  const db = await database.find();
  response.status(200).render("infectados", {
    title: "Ky4n | Infectados",
    db,
  });
});

router.post("/login", async (request, response) => {
  if (request.pass !== request.body.password) {
    flash("Error", "Contraseña incorrecta");
    return await response.redirect("/");
  }
  if (request.session.isAuth == true) return await response.redirect("/");
  request.session.isAuth = true;
  await response.redirect("/");
});

router.get("/logout", async (request, response) => {
  if (request.session.isAuth == false) return await response.redirect("/");
  request.session.isAuth = false;
  await response.redirect("/");
});

module.exports = router;
