const { pool } = require("./db-config");

const queryGetUser = async email => {
  try {
    const command = `SELECT * FROM users WHERE email = "${email}";`;
    const [res, fields] = await pool.query(command);
    //console.log(res[0]);
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
  queryGetUser
};
