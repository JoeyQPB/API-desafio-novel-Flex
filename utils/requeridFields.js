export function validateFields(req, requireFields, requireFieldNumber) {
  let error = false;
  let msg;
  requireFields.forEach((field) => {
    if (!req.body[`${field}`] || typeof req.body[`${field}`] !== "string") {
      error = true;
      msg = `Can not defined -${field}-`;
    }
  });

  if (typeof requireFieldNumber !== "number") {
    error = true;
    msg = ` -${requireFieldNumber}- must be a number`;
  }

  return {
    error: error,
    msg: msg,
  };
}
