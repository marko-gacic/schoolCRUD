import { Router } from "express";
import { getStudentById, getAllStudents, createStudent, deleteStudent, updateStudent, getStudentsByPage } from "../controllers/student.controller"
import { getProfessorTitles, getAllProfessors, getProfessorsByPage, createProfessor, updateProfessor, deleteProfessor, getProfessorById } from "../controllers/professor.controller"
import { getAllSubjects, getSubjectsByPage, getSubjectById, createSubject, updateSubject, deleteSubject, } from "../controllers/subject.controller"
import { hashPassword, sandboxHandler, populateTable, removeAll, getRoles, testRoute } from "../controllers/sandbox.controller"
import { getExamPeriod, getActiveExamPeriod, createExamPeriod, updateExamPeriodById, deleteExamPeriod } from "../controllers/exam-period.controller";
import { getAllExams, getActiveExams, createExam, updateExam, deleteExam } from "../controllers/exam.controller";
import { login } from "../controllers/login.controller";
const router = Router()

// Student CRUD
router.get("/api/students", getAllStudents)
router.get("/api/students/page", getStudentsByPage)
router.get("/api/students/:id", getStudentById)
router.post("/api/students", createStudent)
router.put("/api/students/:id", updateStudent)
router.delete("/api/students/:id", deleteStudent)

// Professor CRUD
router.get("/api/professors", getAllProfessors)
router.get("/api/professors/page", getProfessorsByPage)
router.get("/api/professors/:id", getProfessorById)
router.post("/api/professors", createProfessor)
router.put("/api/professors/:id", updateProfessor)
router.delete("/api/professors/:id", deleteProfessor)

// Professor Titles -> create new controller
router.get("/api/titles", getProfessorTitles)

// Subject CRUD
router.get("/api/subjects", getAllSubjects)
router.get("/api/subjects/page", getSubjectsByPage)
router.get("/api/subjects/:id", getSubjectById)
router.post("/api/subjects", createSubject)
router.put("/api/subjects/:id", updateSubject)
router.delete("/api/subjects/:id", deleteSubject)

// Examination period API
router.get("/api/examperiod", getExamPeriod)
router.get("/api/examperiod/active", getActiveExamPeriod)
router.post("/api/examperiod", createExamPeriod)
router.put("/api/examperiod/:id", updateExamPeriodById)
router.delete("/api/examperiod/:id", deleteExamPeriod)

// Single Examination API
router.get("/exams", getAllExams)
router.get("/exams/active", getActiveExams)
router.post("/exams", createExam)
router.put("/exams/:id", updateExam)
router.delete("/exams/:id", deleteExam)

// sandbox - practice route
router.get("/testRoute/:id", testRoute)
router.get("/hashPassword", hashPassword)
router.get("/sandbox", sandboxHandler)
router.get("/sandbox/populateTable/:numberOfIterations", populateTable)
router.get("/sandbox/removeAll", removeAll)
router.get("/sandbox/getRoles", getRoles)

// Auth routes
router.post("/login", login)

export default router
