import { Request, Response } from 'express';
import { prisma } from "../../prisma/context"
import catchZodError from "../utls/catchZodError"
import { z } from "zod";

export const getStudentById = async (req: Request, res: Response) => {

	const id = Number(req.params.id)

	const student = await prisma.student.findUnique({
		where: {
			id: id
		},
		include: {
			city: true,
			exam: true,
			role: true,
			student_subject: {
				include: {
					subject: true
				}
			}
		}
	})
	const studentMap = { ...student, subjects: student?.student_subject.map(stud => stud.subject.name) }
	res.status(200).json(studentMap)
}

// ex. /api/students/page?offset=1&limit=5
export const getStudentsByPage = async (req: Request, res: Response) => {

	try {
		const offset = Number(req.query.offset)
		const limit = Number(req.query.limit)
		// amount of students in total - get in the response
		// and divide total with limit to floor

		const result = await prisma.student.findMany({
			skip: offset * limit - limit,
			take: limit
		})
		res.json(result)
	} catch (e) {
		catchZodError(e, res)
	}
}

export const getAllStudents = async (req: Request, res: Response) => {

	const result = await prisma.student.findMany()
	res.json(result)
}

export const createStudent = async (req: Request, res: Response) => {
	const { indexYear, firstName, lastName, email, address, postalCode, currentYearOfStudy } = req.body
	const studentDTO = req.body

	studentDTO.indexYear = indexYear;
	studentDTO.firstName = firstName;
	studentDTO.lastName = lastName;
	studentDTO.email = email;
	studentDTO.address = address;
	studentDTO.postalCode = postalCode;
	studentDTO.currentYearOfStudy = currentYearOfStudy;
	studentDTO.roleId = 3;

	if (!studentDTO.cityId) {
		studentDTO.cityId = 1
	}

	try {
		const student = await prisma.student.create({
			data: studentDTO
		})
		res.status(200).json({ message: "New student created successfuly", studentInfo: student, success: !!student })
	} catch (e) {
		catchZodError(e, res)
		res.status(400).json({ success: false, message: "User already exists" })
	}
}

export const deleteStudent = async (req: Request, res: Response) => {

	const id = Number(req.params.id)

	try {
		const student = await prisma.student.delete({
			where: {
				id: id
			}
		})
		if (!student) return res.json({ student: false, message: `Could not delete the student with id ${id} because student with that id does not exist` })
		res.status(200).json({ message: `Student with id ${id} deleted successfuly`, success: true }) // leave only .json()
	} catch (e) {
		catchZodError(e, res)
	}
}

export const updateStudent = async (req: Request, res: Response) => {

	const id = Number(req.params.id)
	const { currentYearOfStudy, postalCode } = req.body

	req.body.currentYearOfStudy = Number(currentYearOfStudy)
	req.body.postalCode = Number(postalCode)

	if (!req.body.indexYear) {
		req.body.indexYear = 2022;
	}

	console.log(req.body);

	const studentData = z.object({
		id: z.number(),
		indexYear: z.number(),
		firstName: z.string(),
		lastName: z.string(),
		email: z.string().email(),
		address: z.string(),
		postalCode: z.number(),
		currentYearOfStudy: z.number(),
	})

	try {
		const student = await prisma.student.update({
			where: {
				id: id
			},
			data: studentData.parse(req.body)
		})
		res.status(200).json({ message: `Student with id ${id} updated successfuly`, studentData: student })
	}
	catch (e) {
		console.log(e, res)
		catchZodError(e, res)
	}
}
