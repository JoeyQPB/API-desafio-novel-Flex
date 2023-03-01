import jwt from "jsonwebtoken";

export function generateToken(user) {
  const { _id, name, role } = user;

  const signature = String(process.env.TOKEN_SIGN_SECRET);
  const expiration = "12h";

  return jwt.sign({ _id, name, role }, signature, { expiresIn: expiration });
}
