import { Request, Response } from 'express';
import { prisma } from "../../prisma/context"
import catchZodError from "../utls/catchZodError"
import { z } from 'zod';

export const getSubjectById = async (req: Request, res: Response) => {

    const id = Number(req.params.id)

    const subject = await prisma.subject.findUnique({
        where: {
            id: id
        }
    })

    if (!subject) return res.json({ subject: false, message: `Could not find the subject with id ${id}` })
    res.json(subject)
}

// ex. /api/subjects/page?offset=1&limit=5
export const getSubjectsByPage = async (req: Request, res: Response) => {

    try {
        const offset = Number(req.query.offset)
        const limit = Number(req.query.limit)

        const result = await prisma.subject.findMany({
            skip: offset * limit - limit,
            take: limit
        })
        res.json(result)
    } catch (e) {
        catchZodError(e, res)
    }
}

export const getAllSubjects = async (req: Request, res: Response) => {

    const result = await prisma.subject.findMany()

    res.json(result)
}

export const createSubject = async (req: Request, res: Response) => {

    const { description, numberOfEsp, yearOfStudy } = req.body

    req.body.numberOfEsp = Number(numberOfEsp)
    req.body.yearOfStudy = Number(yearOfStudy)
    req.body.description ? description : "No description provided"

    const subjectData = z.object({
        name: z.string(),
        description: z.string().optional(),
        numberOfEsp: z.number(),
        yearOfStudy: z.number(),
        semester: z.string(),
    })

    try {
        const subject = await prisma.subject.create({
            data: subjectData.parse(req.body)
        })
        console.log(`Subject ${subjectData.parse(req.body).name} created successfuly`)
        res.status(200).json({ message: `Subject created successfuly`, success: true, subjectData: subject })
    } catch (e) {
        catchZodError(e, res)
    }
}

export const updateSubject = async (req: Request, res: Response) => {

    const id = Number(req.params.id)

    const subjectData = z.object({
        name: z.string(),
        description: z.string().optional(),
        numberOfEsp: z.number(),
        yearOfStudy: z.number(),
        semester: z.string(),
    })

    try {
        const subject = await prisma.subject.update({
            where: {
                id: id
            },
            data: subjectData.parse(req.body)
        })
        res.status(200).json({ message: `Subject with id ${id} updated successfuly`, success: true, subjectData: subject })
    }
    catch (e) {
        console.log(e, res)
        catchZodError(e, res)
    }
}

export const deleteSubject = async (req: Request, res: Response) => {

    const id = Number(req.params.id)

    try {
        const subject = await prisma.subject.delete({
            where: {
                id: id
            }
        })
        if (!subject) return res.json({ success: false, message: `Could not delete the subject with id ${id} because subject with that id does not exist` })
        res.status(200).json({ message: `Subject with id ${id} deleted successfuly`, success: true, subjectData: subject })
    } catch (e) {
        catchZodError(e, res)
    }
}