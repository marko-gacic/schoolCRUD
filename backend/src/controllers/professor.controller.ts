import { Request, Response } from 'express';
import { prisma } from "../../prisma/context"
import catchZodError from "../utls/catchZodError"
import { z } from 'zod';
import { profileEnd } from 'console';

export const getProfessorById = async (req: Request, res: Response) => {

    const id = Number(req.params.id)

    const professor = await prisma.professor.findUnique({
        where: {
            id: id
        }
    })
    if (!professor) return res.json({ professor: false, message: `Could not find the professor with id ${id}` })
    res.status(200).json(professor)
}

// ex. /api/professors/page?offset=1&limit=5
export const getProfessorsByPage = async (req: Request, res: Response) => {

    try {
        const offset = Number(req.query.offset)
        const limit = Number(req.query.limit)

        const result = await prisma.professor.findMany({
            skip: offset * limit - limit,
            take: limit
        })
        res.json(result)
    } catch (e) {
        catchZodError(e, res)
    }
}

export const getAllProfessors = async (req: Request, res: Response) => {

    const result = await prisma.professor.findMany()

    res.json(result)
}

export const createProfessor = async (req: Request, res: Response) => {

    const { reelectionDate, titleId, postalCode } = req.body
    const date = new Date(reelectionDate)

    req.body.reelectionDate = date
    req.body.titleId = Number(titleId)
    req.body.postalCode = Number(postalCode)
    req.body.roleId = 2

    const proffesorData = z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string().email().optional(),
        address: z.string().optional(),
        postalCode: z.number().optional(),
        phone: z.string().optional(),
        reelectionDate: z.date(),
        titleId: z.number().optional(),
        roleId: z.number().optional(),
        cityId: z.number().optional(),
        subjectId: z.number().optional()
    })

    try {
        const professor = await prisma.professor.create({
            data: proffesorData.parse(req.body)
        })
        console.log(`Professor ${JSON.stringify(proffesorData)} with created successfuly`)
        res.status(200).json(professor)
    } catch (e) {
        catchZodError(e, res)
    }
}

export const deleteProfessor = async (req: Request, res: Response) => {

    const id = Number(req.params.id)

    try {
        const professor = await prisma.professor.delete({
            where: {
                id: id
            }
        })
        if (!professor) return res.json({ professor: false, message: `Could not delete the professor with id ${id} because professor with that id does not exist` })
        res.status(200).json()
    } catch (e) {
        catchZodError(e, res)
    }
}

export const updateProfessor = async (req: Request, res: Response) => {

    const id = Number(req.params.id)

    const { reelectionDate, titleId, postalCode } = req.body
    const date = new Date(reelectionDate)

    req.body.reelectionDate = date

    if (req.body.titleId) {
        req.body.titleId = Number(titleId)
    } else {
        req.body.titleId = 2
    }

    req.body.postalCode = Number(postalCode)
    req.body.roleId = 2

    const proffesorData = z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string().email().optional(),
        address: z.string().optional(),
        postalCode: z.number().optional(),
        phone: z.string().optional(),
        reelectionDate: z.date(),
        titleId: z.number().optional(),
    })

    try {
        const professor = await prisma.professor.update({
            where: {
                id: id
            },
            data: proffesorData.parse(req.body)
        })
        res.status(200).json(professor)
    }
    catch (e) {
        console.log(e, res)
        catchZodError(e, res)
    }
}

export const getProfessorTitles = async (req: Request, res: Response) => {

    const titles = await prisma.title.findMany()
    res.status(200).json(titles)

}
