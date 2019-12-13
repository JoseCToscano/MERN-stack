const { pool } = require("./db-config");

const queryGetTaskIdByName = async name => {
  try {
    const [res, fields] = await pool.query(
      `SELECT * FROM tasks WHERE name = '${name}';`
    );
    console.log("res de qtibn: ", res);
    return res;
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  queryGetTaskIdByName
};
