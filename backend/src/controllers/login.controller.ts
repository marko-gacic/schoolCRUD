import { Request, Response } from "express"
import { prisma } from "../../prisma/context"
import { createJWT } from "../auth/jwt"
import bcryptjs from "bcryptjs"

export const login = async (req: Request, res: Response) => {

  const { username, password } = req.body

  const user = await prisma.user.findUnique({
    where: {
      username
    },
    include: {
      role: {
        select: {
          name: true
        }
      }
    }
  })

  console.log(user);
  if (user && user.username) {
    const matches = await bcryptjs.compare(password, user.password);
    console.log(matches);
    if (matches) {
      const token = createJWT({ username, role: user.role?.name })
      return res.status(200).json({ token, loggedIn: true })
    }
  }

  res.status(401).json({ loggedIn: false })
}