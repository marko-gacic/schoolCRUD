import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './students.component';
import { StudentService } from './student.service';

const routes: Routes = [{ path: '', component: StudentsComponent }];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
  providers: [StudentService]
})

export class StudentsRoutingModule { }