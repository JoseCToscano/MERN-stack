const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const { queryGetUser } = require("../../database/queryGetUser");
const { queryGetUserById } = require("../../database/queryGetUserById");
//User Model
//const User = require("../../models/User");

//@route POST api/auth
//@desc Auth user
//@access Public

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  //simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  //Check existing user
  const user = await queryGetUser(req.body.email);
  if (!user) return res.status(400).json({ msg: "User does not exist" });

  // Validate password
  bcrypt
    .compare(password, user.user_password)
    .then(isMatch => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

      jwt.sign(
        { id: user.user_id },
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: user.user_id,
              name: user.first_name,
              email: user.email
            }
          });
        }
      );
    })
    .catch(e => {
      console.log(e);
    });
});

//@route GET api/auth/user
//@desc Get user data
//@access Private

///api/user body get request

router.get("/user", auth, async (req, res) => {
  //console.log("req.body", req.body);
  const queryResult = await queryGetUserById(req.body.user_id);
  console.log(queryResult.user_id);
  res.json(queryResult);
});

// router.get("/", async (req, res) => {
//   const queryResult = await queryGetTasks();

//   res.json(
//     queryResult.sort((a, b) => {
//       return a.task_id - b.task_id;
//     })
//   );
// });

module.exports = router;
