const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

//User queries
const { queryAddUser } = require("../../database/queryAddUser");
const { queryGetTasks } = require("../../database/queryGetTasks");
const { queryCheckUser } = require("../../database/queryCheckUser");
const { queryDelete } = require("../../database/queryDelete");
const { queryGetUser } = require("../../database/queryGetUser");
//const User = require("../../models/User");

//@route POST api/users
//@desc Register new user
//@access Public

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  //simple validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  //Check existing user
  const userExists = await queryCheckUser(req.body.email);
  if (userExists) return res.status(400).json({ msg: "User already exists" });

  // Create new user
  //queryAddUser(req.body.name, req.body.email, req.body.password);
  //res.json({ UserAdded: req.body.name });
  const newUser = { name, email, password };
  //Create salt & hash
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      queryAddUser(newUser.name, newUser.email, newUser.password);
      const user = queryGetUser(req.body.email);
      jwt.sign(
        { id: user.id },
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email
            }
          });
        }
      );
    });
  });
});

module.exports = router;
