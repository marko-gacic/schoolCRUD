import { Request, Response } from 'express';
import { prisma } from "../../prisma/context"
import bcrypt from "bcryptjs"

export const sandboxHandler = async (req: Request, res: Response) => {

	const id = Number(req.params.id)

	const professor = await prisma.student.findMany({
		include: {
			subject: true,
			role: true,
			city: true
		}
	})

	res.json(professor)
}

// hash password
export const hashPassword = async (req: Request, res: Response) => {

	var salt = bcrypt.genSaltSync(10);
	let password = await bcrypt.hash("1234", salt)

	// var hash = bcrypt.hashSync("1234", salt);

	res.json({ password })
}

export const testRoute = async (req: Request, res: Response) => {

	const id = Number(req.params.id)

	const student = await prisma.student.findUnique({
		where: {
			id: id
		},
		include: {
			city: true,
			exam: true,
			role: true
		}
	})
	res.status(200).json(student)
}

export const populateTable = async (req: Request, res: Response) => {

	const numberOfIterations = Number(req.params.numberOfIterations)

	function randomMail() {
		return Math.floor((Math.random() * 1000) + 1) + "test" + Math.floor((Math.random() * 10000) + 1) + `@gmail.com`
	}

	let data: any[] = []
	let newData: any[] = [];

	for (let i = 0; i <= numberOfIterations; i++) {
		newData.push({ indexYear: 2022, firstName: "Luka", lastName: "Golubovic", email: `${randomMail()}`, address: "Beograd", postalCode: 11000, currentYearOfStudy: 4, cityId: 1, roleId: 3 })
	}

	try {
		const students = await prisma.student.createMany({
			data: newData
		})
		res.status(200).json({ message: `Successfuly created ${students.count} students` })
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: "There was a problem populating database", error: error })
	}
}

export const removeAll = async (req: Request, res: Response) => {
	const deleteUsers = await prisma.student.deleteMany({
	})
	res.status(200).json({ message: "Successfuly deleted entire students table" })
}

export const getRoles = async (req: Request, res: Response) => {

	const role = await prisma.role.findMany()

	res.json(role)
}

export const assignProfessorToSubject = async (req: Request, res: Response) => {

	const professorId = Number(req.params.id)

	const professor = await prisma.professor.findUnique({
		where: {
			id: professorId
		}
	})

	const subjectId = req.body.id

	const subject = await prisma.subject.findUnique({
		where: {
			id: subjectId
		}
	})

	res.status(200).json({ message: `Professor ${professor?.firstName} ${professor?.lastName} assign to subject`, success: true })
}
