const { pool } = require("./db-config");

// pool.query("SELECT * FROM pruebas").then(([res, fields]) => {
//   console.log(res);
// });

const queryGetTasks = async () => {
  try {
    const [res, fields] = await pool.query("SELECT * from tasks;");
    return res;
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  queryGetTasks
};
