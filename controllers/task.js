const Task = require("../models/task");

exports.getTask = (req, res, next) => {
  Task.findById(req.params.id)
    .then(results => res.json(results))
    .catch(err => console.log(err));
};

exports.getTasks = (req, res, next) => {
  Task.find()
    .then(results => res.json(results))
    .catch(err => console.log(err));
};

exports.createTask = (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const priority = req.body.priority;
  const createdDate = req.body.createdDate;

  const task = new Task({
    title,
    createdDate,
    description,
    priority
  });
  task
    .save()
    .then(result => {
      return res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.updateTask = (req, res, next) => {
  Task.findById(req.params.id)
    .then(results => {
      results.title = req.body.title;
      results.createdDate = req.body.createdDate;
      results.description = req.body.description;
      results.priority = req.body.priority;
      results.save();
      return res.json(results);
    })
    .catch(err => console.log(err));
};

exports.deleteTask = (req, res, next) => {
  Task.findByIdAndRemove(req.params.id)
    .then(() => res.json({ messege: "Task Removed" }))
    .catch(err => console.log(err));
};
