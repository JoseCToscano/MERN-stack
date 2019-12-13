const { pool } = require("./db-config");

const queryGetTasksById = async id => {
  try {
    const [res, fields] = await pool.query(
      `SELECT * FROM tasks WHERE task_user_id = ${id};`
    );
    return res;
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  queryGetTasksById
};
