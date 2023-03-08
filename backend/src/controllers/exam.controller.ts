import { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from "../../prisma/context"
import catchZodError from '../utls/catchZodError';

export const getAllExams = async (req: Request, res: Response) => {

  const exam = await prisma.exam.findMany()

  res.json(exam)
}

export const getActiveExams = async (req: Request, res: Response) => {

  const exam = await prisma.exam.findMany()

  res.json(exam)
}

export const createExam = async (req: Request, res: Response) => {

  const id = Number(req.params.id)

  const examData = z.object({
    id: z.number(),
    date: z.date(),
    examperiodId: z.number().optional(),
    professorId: z.number(),
    subjectId: z.number()
  })

  try {
    const exam = await prisma.exam.create({
      data: examData.parse(req.body)
    })
    res.status(200).json({ message: 'Exam created successfuly', success: true })
  } catch (e) {
    catchZodError(e, res)
  }
}

export const updateExam = async (req: Request, res: Response) => {

}

export const deleteExam = async (req: Request, res: Response) => {

}