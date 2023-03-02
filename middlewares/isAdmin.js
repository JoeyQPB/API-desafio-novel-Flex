export function isAdmin(req, res, next) {
  try {
    return req.currentUser.role !== "ADMIN"
      ? res.status(401).json({ msg: "User unauthorized" })
      : next();
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}
