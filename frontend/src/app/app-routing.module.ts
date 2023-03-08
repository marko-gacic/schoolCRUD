import { ProfessorDetailsComponent } from './modules/professors/professor-details/professor-details.component';
import { LoginComponent } from './core/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsAuthenticatedGuard } from './core/auth/is-authenticated.guard';
import { PageNotFoundComponent } from './core/layout/page-not-found/page-not-found.component';
import { StudentDetailsComponent } from './modules/students/student-details/student-details.component'
import { LoginGuard } from './core/auth/login.guard';

const routes: Routes = [
  { path: 'students', loadChildren: () => import('./modules/students/students.module').then(m => m.StudentsModule), canActivate: [IsAuthenticatedGuard] },
  { path: 'student/:id', component: StudentDetailsComponent, canActivate: [IsAuthenticatedGuard] },
  { path: 'professor/:id', component: ProfessorDetailsComponent, canActivate: [IsAuthenticatedGuard] },
  { path: 'professors', loadChildren: () => import('./modules/professors/professors.module').then(m => m.ProfessorsModule), canActivate: [IsAuthenticatedGuard] },
  { path: 'subjects', loadChildren: () => import('./modules/subjects/subjects.module').then(m => m.SubjectsModule), canActivate: [IsAuthenticatedGuard] },
  { path: 'exam', loadChildren: () => import('./modules/exam/exam.module').then(m => m.ExamModule), canActivate: [IsAuthenticatedGuard] },
  { path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [IsAuthenticatedGuard] },
  { path: 'exam-period', loadChildren: () => import('./modules/exam-period/exam-period.module').then(m => m.ExamPeriodModule), canActivate: [IsAuthenticatedGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
