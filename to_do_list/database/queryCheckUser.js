const { pool } = require("./db-config");

const queryCheckUser = async email => {
  try {
    const command = `SELECT * FROM users WHERE email = "${email}";`;
    const [res, fields] = await pool.query(command);

    if (res[0]) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  queryCheckUser
};
