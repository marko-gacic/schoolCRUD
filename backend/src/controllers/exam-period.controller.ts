import { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from "../../prisma/context"
import catchZodError from '../utls/catchZodError';

export const getExamPeriod = async (req: Request, res: Response) => {

	const exam = await prisma.examperiod.findMany()

	res.json(exam)
}

export const getActiveExamPeriod = async (req: Request, res: Response) => {

	const exam = await prisma.examperiod.findMany({
		where: {
			status: true,
		}
	})
	res.json(exam)
}

export const createExamPeriod = async (req: Request, res: Response) => {

	req.body.start = new Date(req.body.start)
	req.body.end = new Date(req.body.end)
	req.body.status = Boolean(req.body.status)

	const examPeriodData = z.object({
		name: z.string(),
		start: z.date(),
		end: z.date(),
		status: z.boolean(),
	})

	try {
		const exam = await prisma.examperiod.create({
			data: examPeriodData.parse(req.body)
		})
		res.status(200).json(exam)
	} catch (e) {
		catchZodError(e, res)
	}
}

export const updateExamPeriodById = async (req: Request, res: Response) => {
	const id = Number(req.params.id)

	req.body.start = new Date(req.body.start)
	req.body.end = new Date(req.body.end)
	req.body.status = Boolean(req.body.status)

	const examPeriodData = z.object({
		name: z.string(),
		start: z.date(),
		end: z.date(),
		status: z.boolean(),
	})

	try {
		const examPeriod = await prisma.examperiod.update({
			where: {
				id: id
			},
			data: examPeriodData.parse(req.body)
		})
		res.status(200).json(examPeriod)
	} catch(e){
		catchZodError(e,res)
	}
}

export const deleteExamPeriod = async (req: Request, res: Response) => {
	const id = Number(req.params.id)

	const examPeriod = await prisma.examperiod.delete({
		where: {
			id: id
		}
	})
	res.status(200).json(examPeriod)
}
