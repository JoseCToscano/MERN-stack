const { pool } = require("./db-config");

const queryAddTask = async (name, task_user_id, is_done) => {
  try {
    const command = `INSERT INTO tasks(name,task_user_id, is_done) VALUES('${name}',${String(
      task_user_id
    )},${String(is_done)});`;
    const [res, fields] = await pool.query(command);
    return res;
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  queryAddTask
};
