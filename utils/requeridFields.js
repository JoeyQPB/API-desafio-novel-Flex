export function validateFields(req, requireFieldsString, requireFieldsNumber) {
  let error = false;
  let msg;
  requireFieldsString.forEach((field) => {
    if (!req.body[`${field}`] || typeof req.body[`${field}`] !== "string") {
      error = true;
      msg = `Missing required fields: ${field}`;
    }
  });

  requireFieldsNumber.forEach((field) => {
    if (
      !req.body[`${field}`] ||
      typeof req.body[`${field}`] !== "number" ||
      req.body[`${field}`] < 0
    ) {
      error = true;
      msg = `Missing required fields: ${field} and must to be a number`;
    }
  });

  return {
    error: error,
    msg: msg,
  };
}
