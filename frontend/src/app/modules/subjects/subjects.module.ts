import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubjectsRoutingModule } from './subjects-routing.module';
import { SubjectsComponent } from './subjects.component';
import { AddSubjectDialogComponent } from './dialogs/add-subject-dialog/add-subject-dialog.component';
import { EditSubjectDialogComponent } from './dialogs/edit-subject-dialog/edit-subject-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MaterialModule } from 'src/app/modules/material/material.module';


@NgModule({
  declarations: [
    SubjectsComponent,
    AddSubjectDialogComponent,
    EditSubjectDialogComponent
  ],
  imports: [
    CommonModule,
    SubjectsRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SubjectsModule { }
