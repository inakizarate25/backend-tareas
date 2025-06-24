const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const verifyToken = require("../middleware/verifyToken");

// Crear nueva tarea
router.post("/", verifyToken, async (req, res) => {
  const { title, description } = req.body;
  try {
    const newTask = new Task({
      title,
      description,
      userId: req.user.id,
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ msg: "Error al crear la tarea." });
  }
});

// Obtener todas las tareas del usuario
router.get("/", verifyToken, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: "Error al obtener las tareas." });
  }
});

// Actualizar tarea
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!updatedTask)
      return res.status(404).json({ msg: "Tarea no encontrada." });
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ msg: "Error al actualizar la tarea." });
  }
});

// Eliminar tarea
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const deletedTask = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!deletedTask)
      return res.status(404).json({ msg: "Tarea no encontrada." });
    res.json({ msg: "Tarea eliminada." });
  } catch (err) {
    res.status(500).json({ msg: "Error al eliminar la tarea." });
  }
});

module.exports = router;
