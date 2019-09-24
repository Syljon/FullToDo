const mongose = require("mongoose");
const Schema = mongose.Schema;

const taskSchema = new Schema({
  title: { type: String, required: true },
  priority: { type: Number, required: true },
  description: { type: String, required: false },
  createdDate: { type: Date, required: false },
  done: { type: Boolean, required: true }
});

module.exports = mongose.model("task", taskSchema);
