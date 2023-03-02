export function validateFields(req, requireFieldsString, requireFieldsNumber) {
  let error = false;
  let msg;
  requireFieldsString.forEach((field) => {
    if (!req.body[`${field}`] || typeof req.body[`${field}`] !== "string") {
      error = true;
      msg = `Can not defined -${field}-`;
    }
  });

  requireFieldsNumber.forEach((field) => {
    if (!req.body[`${field}`] || typeof req.body[`${field}`] !== "number") {
      error = true;
      msg = `Can not defined -${field}-`;
    }
  });

  return {
    error: error,
    msg: msg,
  };
}
