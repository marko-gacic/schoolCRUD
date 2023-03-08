import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { ModalComponent } from './modal/modal.component';


@NgModule({
	declarations: [
		StudentsComponent,
		StudentDetailsComponent,
		ModalComponent,
	],
	imports: [
		CommonModule,
		StudentsRoutingModule,
		MatInputModule,
		MatFormFieldModule,
		MaterialModule,
		FormsModule,
		ReactiveFormsModule
	],
	providers: [
		{ provide: MAT_DIALOG_DATA, useValue: {} },
		{ provide: MatDialogRef, useValue: {} }
	],
	entryComponents: [ModalComponent]
})
export class StudentsModule { }
