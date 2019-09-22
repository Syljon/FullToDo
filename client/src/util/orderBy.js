import _ from "lodash";

export default function orderBy(fetchedTask, value, cb) {
  let newTaskList;
  switch (value) {
    case "title":
      newTaskList = _.orderBy(fetchedTask, [
        value => value.title.toLowerCase()
      ]);
      break;
    case "priority":
      newTaskList = _.orderBy(
        fetchedTask,
        "priority",
        value === "priority" ? "desc" : "asc"
      );
      break;
    case "createdDate":
      newTaskList = _.orderBy(fetchedTask, "createdDate");
      break;
    default:
      newTaskList = fetchedTask;
      break;
  }
  console.log(newTaskList);
  cb(newTaskList);
}
