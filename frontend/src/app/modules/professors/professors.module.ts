import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfessorsRoutingModule } from './professors-routing.module';
import { ProfessorsComponent } from './professors.component';
import { AddProfessorDialogComponent } from './dialogs/add-professor-dialog/add-professor-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { EditProfessorComponent } from './dialogs/edit-professor/edit-professor.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfessorDetailsComponent } from './professor-details/professor-details.component';
import { ModalComponent } from './modal/modal.component';


@NgModule({
  declarations: [
    ProfessorsComponent,
    AddProfessorDialogComponent,
    EditProfessorComponent,
    ProfessorDetailsComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    ProfessorsRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    SharedModule
  ]
})
export class ProfessorsModule { }
