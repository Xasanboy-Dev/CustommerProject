import jwt from "jsonwebtoken";
const SECRET = process.env.SECRET_KEY;

export function VerifyToken(token: string) {
  return jwt.verify(token, SECRET!);
}

export function Sign(name: string, lastname: string, phoneNumber: string) {
  const payload = { name, lastname, phoneNumber };
  return jwt.sign(payload, SECRET!);
}
