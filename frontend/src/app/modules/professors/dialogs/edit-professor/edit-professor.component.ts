import { Component, Inject, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfessorsService } from '../../professors.service';

interface Title {
  id: number
  name: string
}

@Component({
  selector: 'app-edit-professor',
  templateUrl: './edit-professor.component.html',
  styleUrls: ['./edit-professor.component.scss']
})
export class EditProfessorComponent implements OnInit {
  titleId!: string;
  titles: Title[] = []

  professorForm = this.fb.group({
    id: [],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    titleId: ['', Validators.required],
    email: ['', [Validators.required, Validators.email, Validators.minLength(3)]],
    address: ['', Validators.required],
    postalCode: [0, Validators.required],
    phone: ['', Validators.required],
    reelectionDate: ['', Validators.required],
  });

  constructor(
    private professorService: ProfessorsService,
    private fb: FormBuilder = new FormBuilder(),
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    const { id, reelectionDate, firstName, lastName, titleId, email, address, postalCode, phone } = this.data
    this.professorForm.setValue({
      id, firstName, lastName, titleId, email, address, postalCode, reelectionDate, phone
    })
  }

  onSubmit(form: any) {
    if (!form.titleId) {
      form.titleId = 2
    }
    this.professorService.update(form).subscribe(res => {
    })
    this.openSnackBar('Professor successfuly updated!', 'Close')
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
      panelClass: ['mat-toolbar', 'mat-primary']
    });
  }

  ngOnInit(): void {
    this.professorService.getProfessorTitles().subscribe((res) => {
      this.titles = res
    })
  }
}
