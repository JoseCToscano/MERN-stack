const { pool } = require("./db-config");

const queryGetUserById = async user_id => {
  try {
    const command = `SELECT * FROM users WHERE user_id = "${user_id}";`;
    const [res, fields] = await pool.query(command);
    //console.log("user_id", user_id);
    if (res[0]) {
      return res[0];
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  queryGetUserById
};
