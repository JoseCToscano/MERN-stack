const { pool } = require("./db-config");

const queryDelete = async name => {
  try {
    const command = `DELETE FROM tasks
        WHERE name = '${name}';`;
    const [res, fields] = await pool.query(command);
    return res;
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  queryDelete
};
