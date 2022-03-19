/**
 * @author: @aqu4x0
 * @license: MIT
 */

const { Schema, model } = require("mongoose");

/**
 * @description: Schema para la subida de post a la base de datos, siguiente termino:
 *
 * [*] Post:
 *  - id: Number
 *  - title: String
 *  - IPv4: String
 *  - OneContent: String
 *  - TwoContent: String
 *  - ThreeContent: String
 *  - Author: String,
 *  - Fecha: String
 */

const PostModel = new Schema({
  id: Number,
  title: String,
  IPv4: String,
  OneContent: String,
  TwoContent: String,
  ThreeContent: String,
  Author: String,
  Fecha: String,
});

module.exports = model("Schema", PostModel);
