import { Student } from 'src/app/modules/students/interfaces/student';
import { Component, Inject, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  currentYear = new Date().getFullYear();
  private createMode!: boolean;
  title: string = "Add new"

  studentForm = this.fb.group({
    id: [],
    indexYear: [this.currentYear],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    address: ['', Validators.required],
    postalCode: ['', Validators.required],
    currentYearOfStudy: ['', Validators.required],
  });

  constructor(
    private studentService: StudentService,
    private fb: FormBuilder = new FormBuilder(),
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (this.data.student) {
      this.createMode = false
      this.title = "Edit"
      const { id, indexYear, firstName, lastName, email, address, postalCode, currentYearOfStudy } = this.data.student
      this.studentForm.setValue({
        id, indexYear, firstName, lastName, email, address, postalCode, currentYearOfStudy
      })
    } else {
      this.createMode = true
    }
  }

  onCreate(student: Student) {
    this.data.actionCreate(student)
  }

  onUpdate(student: Student) {
    this.data.actionUpdate(student)
  }

  onSubmit(form: any) {
    if (this.createMode) {
      // form.id = this.studentForm.get('id')?.setValue()
      this.data.actionCreate(form)
      this.dialogRef.close()
      this.openSnackBar('Student successfuly created!', 'Close')
    } else {
      form.id = this.data.student.id
      this.data.actionUpdate(form)
      this.dialogRef.close()
      this.openSnackBar('Student successfuly updated!', 'Close')
    }
  }

  onClose() {
    this.dialogRef.close()
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
      panelClass: ['mat-toolbar', 'mat-primary']
    });
  }

}
