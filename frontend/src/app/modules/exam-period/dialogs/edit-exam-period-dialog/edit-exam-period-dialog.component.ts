import { ExamPeriodService } from './../../exam-period.service';
import { Component, Inject, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-edit-exam-period-dialog',
	templateUrl: './edit-exam-period-dialog.component.html',
	styleUrls: ['./edit-exam-period-dialog.component.scss']
})
export class EditExamPeriodDialogComponent implements OnInit {

	examPeriodForm = this.fb.group({
		id: [],
		name: ['', Validators.required],
		start: ['', Validators.required],
		end: ['', Validators.required],
		status: ['', [Validators.required, Validators.email, Validators.minLength(3)]],
	});

	constructor(
		private examPeriodService: ExamPeriodService,
		private fb: FormBuilder = new FormBuilder(),
		private _snackBar: MatSnackBar,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {
		const { id, name, start, end, status } = this.data
		this.examPeriodForm.setValue({
			id, name, start, end, status
		})

	}

	onSubmit(form: any) {
		this.examPeriodService.update(form).subscribe(res => {
		})
		this.openSnackBar('Exam period successfuly updated!', 'Close')
	}

	openSnackBar(message: string, action: string) {
		this._snackBar.open(message, action, {
			duration: 3000,
			panelClass: ['mat-toolbar', 'mat-primary']
		});
	}

	ngOnInit(): void { }

}
