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
    } catch (error) {
      next(error);
    }
  }
  static async deleteTask(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
};
