var User = require("../models").User;
var Role = require("../models").Role;
require("dotenv").config();
const jwt = require("jsonwebtoken");
let ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
exports.login = (req, res) => {
  User.findOne({
    where: { email: req.body.email, password: req.body.password },
    attributes: [
      "avatar",
      "firstName",
      "lastName",
      "id",
      "phone",
      "male",
      "address",
      "email",
    ],
    include: [
      {
        model: Role ,
      },
    ],
  }).then((data) => {
    if (data !== null && typeof data === 'object' && data !== true) {
      var user = {
        id: data.id,
        avatar: data.avatar,
        role: data.Roles.name,
      };
      var token = jwt.sign({ user }, ACCESS_TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: "3h",
      });
      res.json(token);
    } else {
      res.json("err");
    }
  });
};
