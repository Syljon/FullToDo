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
  const imageURL = req.body.imageURL;
  const createdDate = req.body.createdDate;
  const description = req.body.description;
  const priority = req.body.priority;
  const label = req.body.label;

  const task = new Task({
    title,
    imageURL,
    createdDate,
    description,
    priority,
    label
  });
  task
    .save()
    .then(result => {
      console.log("TASK Created", result);
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
      results.imageURL = req.body.imageURL;
      results.createdDate = req.body.createdDate;
      results.description = req.body.description;
      results.priority = req.body.priority;
      results.label = req.body.label;
      results.save();
      return res.json(results);
    })
    .catch(err => console.log(err));
};

exports.deleteTask = (req, res, next) => {
  console.log(req.params.id);
  Task.findByIdAndRemove(req.params.id)
    .then(() => res.json({ messege: "Task Removed" }))
    .catch(err => console.log(err));
};
