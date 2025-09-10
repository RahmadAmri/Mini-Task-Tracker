const { Task } = require("../models/index");

module.exports = class Controller {
  static async getTask(req, res, next) {
    try {
      const data = await Task.findAll();
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async addTask(req, res, next) {
    try {
      let { title, completed } = req.body;

      if (!title || !title.trim()) {
        throw { name: "Bad Request", message: "Title is required" };
      }

      if (typeof completed !== Boolean) {
        completed = false;
      }

      const data = await Task.create({
        title: title.trim(),
        completed,
      });

      res.status(201).json({
        id: data.id,
        title: data.title,
        completed: data.completed,
      });
    } catch (error) {
      next(error);
    }
  }
  static async editTask(req, res, next) {
    try {
      const { id } = req.params;
      const { title, completed } = req.body;

      if (title === undefined && completed === undefined) {
        throw { name: "Bad Request", message: "No fields to update" };
      }

      const task = await Task.findByPk(id);
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }

      if (title !== undefined) {
        if (typeof title !== "string" || !title.trim()) {
          throw {
            name: "Bad Request",
            message: "Title must be a non-empty string",
          };
        }
        task.title = title.trim();
      }

      if (completed !== undefined) {
        if (typeof completed !== "boolean") {
          throw { name: "Bad Request", message: "Completed must be boolean" };
        }
        task.completed = completed;
      }

      await task.save();

      res.status(200).json({
        id: task.id,
        title: task.title,
        completed: task.completed,
      });
    } catch (error) {
      next(error);
    }
  }
  static async deleteTask(req, res, next) {
    try {
      const { id } = req.params;

      const task = await Task.findByPk(id);
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }

      await task.destroy();

      res.status(200).json({
        message: "Task deleted",
        id: task.id,
        title: task.title,
        completed: task.completed,
      });
    } catch (error) {
      next(error);
    }
  }
};
