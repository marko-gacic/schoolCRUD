import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamPeriodRoutingModule } from './exam-period-routing.module';
import { ExamPeriodComponent } from './exam-period.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MaterialModule } from '../material/material.module';
import { EditExamPeriodDialogComponent } from './dialogs/edit-exam-period-dialog/edit-exam-period-dialog.component';


@NgModule({
  declarations: [
    ExamPeriodComponent,
    EditExamPeriodDialogComponent
  ],
  imports: [
    CommonModule,
    ExamPeriodRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ExamPeriodModule { }
