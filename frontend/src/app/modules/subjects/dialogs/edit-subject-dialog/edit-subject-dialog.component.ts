import { Component, Inject, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SubjectsService } from '../../subjects.service';

interface Semester {
  id: number
  name: string
}

@Component({
  selector: 'app-edit-subject-dialog',
  templateUrl: './edit-subject-dialog.component.html',
  styleUrls: ['./edit-subject-dialog.component.scss']
})
export class EditSubjectDialogComponent implements OnInit {
  semesters: Semester[] = [
    { id: 1, name: "Winter" },
    { id: 2, name: "Summer" }
  ]

  subjectForm = this.fb.group({
    id: [],
    name: ['', Validators.required],
    description: ['', Validators.required],
    numberOfEsp: [0, Validators.required],
    yearOfStudy: [0, Validators.required],
    semester: ['', Validators.required]
  });

  constructor(
    private subjectService: SubjectsService,
    private fb: FormBuilder = new FormBuilder(),
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    const { id, name, description, semester, numberOfEsp, yearOfStudy } = this.data
    this.subjectForm.setValue({
      id, name, description, semester, numberOfEsp, yearOfStudy
    })
  }

  onSubmit(form: any) {
    this.subjectService.update(form).subscribe(res => {
      console.log(res);
    })
    this.openSnackBar('Subject successfuly updated!', 'Close')
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
      panelClass: ['mat-toolbar', 'mat-primary']
    });
  }

  ngOnInit(): void {
  }

}
