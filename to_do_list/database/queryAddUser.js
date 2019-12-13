const { pool } = require("./db-config");

const queryAddUser = async (name, email, password) => {
  try {
    const command = `INSERT INTO users(first_name, email, user_password) VALUES('${name}', '${email}', '${password}');`;
    const [res, fields] = await pool.query(command);
    return res;
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  queryAddUser
};
