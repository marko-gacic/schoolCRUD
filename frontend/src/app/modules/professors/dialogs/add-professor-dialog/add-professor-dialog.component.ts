import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfessorsService } from '../../professors.service';

interface Title {
  id: number
  name: string
}

@Component({
  selector: 'app-add-professor-dialog',
  templateUrl: './add-professor-dialog.component.html',
  styleUrls: ['./add-professor-dialog.component.scss']
})
export class AddProfessorDialogComponent implements OnInit {
  titleId!: string;
  titles: Title[] = []

  professorForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    titleId: ['', Validators.required],
    email: ['', [Validators.required, Validators.email, Validators.minLength(3)]],
    address: ['', Validators.required],
    postalCode: [0, Validators.required],
    phone: ['', Validators.required],
    reelectionDate: ["", Validators.required]
  });

  constructor(
    private professorService: ProfessorsService,
    private fb: FormBuilder = new FormBuilder(),
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onSubmit(form: any) {
    this.professorService.create(form).subscribe(res => {
      if (res) {
        this.data = true
        this.openSnackBar('Professor successfuly created!', 'Close')
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
    this.professorService.getProfessorTitles().subscribe((res) => {
      this.titles = res
    })
  }

}
