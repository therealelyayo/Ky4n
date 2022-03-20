/**
 * @author: @aqu4x0
 * @license: MIT
 */

const express = require("express"),
  flash = require("express-flash"),
  router = express.Router(),
  database = require("../models/post.schema"),
  { Auth } = require("../../settings.json");

/** @description: Ahora la estructura principal de la API: */

router.get("/", async (request, response) => {
  response.status(200).json({
    success: true,
    message: "[200] Home",
  });
});

router.get("/post", async (request, response) => {
  const query = request.query;
  const data = await database.find();

  const date = new Date();
  const dia = date.getDay();
  const hora = date.getHours();
  const minutos = date.getMinutes();
  const fecha = `${dia}:${hora}:${minutos}`;

  if (
    !query.title ||
    !query.IPv4 ||
    !query.OneContent ||
    !query.TwoContent ||
    !query.ThreeContent ||
    !query.Author
  ) {
    response.status(400).json({
      success: false.valueOf(),
      message: "[400] Bad request | No query",
    });
  } else {
    database.init();
    new database({
      _id: data.length,
      title: query.title,
      IPv4: query.IPv4,
      OneContent: query.OneContent,
      TwoContent: query.TwoContent,
      ThreeContent: query.ThreeContent,
      Author: query.Author,
      Fecha: fecha,
    })
      .save()
      .then(() => {
        response.json({
          success: true,
          message: "[200] Post created",
          query,
        });
      });
  }
});

router.get("/get", async (request, response) => {
  if (request.session.isAuth == false) return await response.redirect("/");
  const password = Auth["Password"];
  const query = request.query;

  if (!query.id) {
    flash("error", "No query");
    return await response.redirect("/");
  } else {
    if (isNaN(query.id)) {
      flash("Error", "Invalid query");
      return await response.redirect("/");
    } else {
      const db = await database.find({ _id: query.id });
      response.render("infectado", {
        title: `Ky4n | ID: ${query.id}`,
        db,
        password,
      });
    }
  }
});

router.delete("/remove", async (request, response) => {
  const query = request.query;
  const password = Auth["Password"];

  if (!query.id && !query.Password) {
    response.status(400).json({
      success: false.valueOf(),
      message: "[400] Bad request | Password where is it?",
    });
    return await response.redirect("/");
  } else {
    if (query.Password === password) {
      const db = database.findOneAndRemove(
        { _id: query.id },
        function (err, res) {
          if (err) {
            response.status(500).json({
              success: false.valueOf(),
              message: "[500] Internal server error",
              error: err,
            });
          } else {
            response.json({
              success: true,
              message: "[200] Post deleted",
            });
          }
        }
      );
    } else {
      response.status(400).json({
        success: false.valueOf(),
        message: "[400] Bad request | Password is not correct",
      });
      return await response.redirect("/");
    }
  }
});

module.exports = router;
