import jwt, { JwtPayload } from "jsonwebtoken"

export interface IUserPayload extends JwtPayload {
  user?: string
  role?: string
}

const secret = process.env.SECRET || "secret123"

export const createJWT = (payload: IUserPayload) => {
  return jwt.sign(payload, secret, { expiresIn: "24h", })
}

export const verifyJWT = (authToken: string): IUserPayload | string => {
  try {
    return jwt.verify(authToken, secret)
  } catch (error) {
    return {}
  }
}

export const loggedUser = (authToken: string): IUserPayload | string => {
  try {
    return verifyJWT(authToken)
  } catch (error) {
    return {}
  }
}