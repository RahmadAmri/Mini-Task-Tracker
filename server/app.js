const express = require("express");
const app = express();
const port = 3000;
const Controller = require("./controllers/controller");
const errorHandler = require("./middlewares/errorHandler");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/task", Controller.getTask);
app.post("/api/task", Controller.addTask);
app.patch("/api/task/:id", Controller.editTask);
app.delete("/api/task/:id", Controller.deleteTask);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
