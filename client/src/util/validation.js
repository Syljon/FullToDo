function isEmpty(value) {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
}
export default function validateForm(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (data.title.length === 0) {
    errors.title = "Title field is required";
  }

  if (
    data.title.length > 0 &&
    (data.title.length < 2 || data.title.length > 30)
  ) {
    errors.title = "Email field must be between 2 and 30";
  }

  if (data.priority === 0) {
    errors.priority = "Priority field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
