import { ProfessorsService } from './../professors.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface Title {
  id: number
  name: string
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  titles: Title[] = []

  currentYear = new Date().getFullYear();
  private createMode!: boolean;
  title: string = "Add new"

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
    private dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (this.data) {
      this.createMode = false
      this.title = "Edit"
      const { id, reelectionDate, firstName, lastName, titleId, email, address, postalCode, phone } = this.data
      this.professorForm.setValue({
        id, firstName, lastName, titleId, email, address, postalCode, reelectionDate, phone
      })
    } else {
      this.createMode = true
    }
  }

  // 2 Modes for creating and editing students
  onSubmit(form: any) {
    form.titleId = 2
    if (this.createMode) {
      this.data = form
      this.dialogRef.close({ data: form })
      this.openSnackBar('Professor successfuly created!', 'Close')
    } else {
      form.id = this.data.id
      this.dialogRef.close({ data: form })
      this.openSnackBar('Professor successfuly updated!', 'Close')
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

  ngOnInit(): void {
    this.professorService.getProfessorTitles().subscribe((res) => {
      this.titles = res
    })
  }
}
