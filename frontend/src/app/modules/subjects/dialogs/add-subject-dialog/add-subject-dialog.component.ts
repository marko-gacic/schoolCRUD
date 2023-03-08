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
  selector: 'app-add-subject-dialog',
  templateUrl: './add-subject-dialog.component.html',
  styleUrls: ['./add-subject-dialog.component.scss']
})
export class AddSubjectDialogComponent implements OnInit {
  semesters: Semester[] = [
    { id: 1, name: "Winter" },
    { id: 2, name: "Summer" }
  ]

  subjectForm = this.fb.group({
    id: [],
    name: ['', Validators.required],
    description: ['', Validators.required],
    semester: ['', [Validators.required]],
    numberOfEsp: [0, Validators.required],
    yearOfStudy: [0, Validators.required],
  });

  constructor(
    private subjectService: SubjectsService,
    private fb: FormBuilder = new FormBuilder(),
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onSubmit(form: any) {
    this.subjectService.create(form).subscribe(res => {
      if (res) {
        this.data = true
        this.openSnackBar('Subject successfuly created!', 'Close')
      }
    })
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
