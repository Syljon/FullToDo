const express = require("express");

const taskController = require("../controllers/task");

const router = express.Router();

// GET /task/all return ALL TASK
router.get("/", taskController.getTasks);

// POST /task/create create NEW TASK
router.post("/", taskController.createTask);

// GET /task/:id return one task
router.get("/:id", taskController.getTask);

// PUT /task/:id update TASK
router.put("/:id", taskController.updateTask);

// DELETE /task/:id delete selected TASK
router.delete("/:id", taskController.deleteTask);

module.exports = router;
