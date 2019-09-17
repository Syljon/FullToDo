const mongose = require("mongoose");
const Schema = mongose.Schema;

const taskSchema = new Schema({
  title: { type: String, required: true },
  imageURL: { type: String, required: false },
  createdDate: { type: Date, required: false },
  description: { type: String, required: false },
  priority: { type: Number, required: true },
  label: { type: String, required: false }
});

module.exports = mongose.model("task", taskSchema);
