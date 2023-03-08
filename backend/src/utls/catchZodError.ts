import { Response } from "express";
import { ZodError } from "zod";

const catchZodError = (e: any, res: Response) => {
    if (e instanceof ZodError) {
        return res.status(400).json({ error: e.flatten() })
    }
    console.log(e)
}

export default catchZodError