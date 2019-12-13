const express = require("express");
const router = express.Router();
const { queryGetTasks } = require("../../database/queryGetTasks");
const { queryGetTasksById } = require("../../database/queryGetTasksById");
const { queryAddTask } = require("../../database/queryAddTask");
const { queryDelete } = require("../../database/queryDelete");
const auth = require("../middleware/auth");

router.get("/", async (req, res) => {
  const queryResult = await queryGetTasks();

  res.json(
    queryResult.sort((a, b) => {
      return a.task_id - b.task_id;
    })
  );
});

router.post("/", auth, async (req, res) => {
  await queryAddTask(req.body.name, 1, 1);

  res.json({ name: req.body.name });
});

router.delete("/:name", auth, (req, res) => {
  //console.log("items/delete: ", req.params.name);
  queryDelete(req.params.name);
  res.json({ success: true });
});
router.get("/:id", auth, async (req, res) => {
  const queryResult = await queryGetTasksById(req.params.id);
  res.json(
    queryResult.sort((a, b) => {
      return a.task_id - b.task_id;
    })
  );
});

module.exports = router;
