import { StudentsRoutingModule } from './../../students/students-routing.module';
export interface Subject {
  id: number
  name: string
  description: string
  numberOfEsp: number
  yearOfStudy: number
  semester: string
  examId: number | null | undefined
}