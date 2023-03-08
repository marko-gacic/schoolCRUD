import { ExamPeriod } from './interfaces/exam-period';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExamPeriodService } from './exam-period.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { EditExamPeriodDialogComponent } from './dialogs/edit-exam-period-dialog/edit-exam-period-dialog.component';
import { DeleteDialogComponent } from 'src/app/shared/components/delete-dialog/delete-dialog.component';

@Component({
	selector: 'app-exam-period',
	templateUrl: './exam-period.component.html',
	styleUrls: ['./exam-period.component.scss']
})
export class ExamPeriodComponent implements OnInit {

	displayedColumns: string[] = ['name', 'start', 'end', 'status', 'edit', 'delete'];
	examPeriods = new MatTableDataSource<ExamPeriod>()
	value = '';

	@ViewChild(MatSort) sort!: MatSort;
	@ViewChild(MatTable) table!: MatTable<ExamPeriod>;

	constructor(
		private fb: FormBuilder = new FormBuilder(),
		private examPeriodService: ExamPeriodService,
		private _snackBar: MatSnackBar,
		private _liveAnnouncer: LiveAnnouncer,
		public dialog: MatDialog,
		private changeDetectorRefs: ChangeDetectorRef
	) { }

	examPeriodForm = this.fb.nonNullable.group({
		id: [],
		name: ['', Validators.required],
		start: new FormControl<Date | null>(null),
		end: new FormControl<Date | null>(null),
		status: [0, Validators.required],
	})

	onSubmit(form: any) {
		this.examPeriodService.create(form).subscribe(res => {
			if (res) {
				this.openSnackBar('Exam period successfuly created!', 'Close')
				this.examPeriodService.getAll().subscribe()
				this.refresh();
			}
		})
	}

	openSnackBar(message: string, action: string) {
		this._snackBar.open(message, action, {
			duration: 3000,
			panelClass: ['mat-toolbar', 'mat-primary']
		});
	}

	openEditDialog(examPeriod: ExamPeriod) {
		this.dialog.open(EditExamPeriodDialogComponent, { data: examPeriod }).afterClosed().subscribe(() => {
			this.refresh()
		})
	}

	deleteExamPeriod(id: number) {
		this.examPeriodService.delete(id).subscribe(() => {
			this.refresh()
		})
	}

	openDeleteDialog(examPeriod: any) {
		this.dialog.open(DeleteDialogComponent, {
			data: {
				title: 'Are you sure?', message: `Do you want to delete exam period for ${examPeriod.name}`, confirmButton: "Delete", action: () => this.deleteExamPeriod(examPeriod.id)
			}
		})
	}

	refresh() {
		this.examPeriodService.getAll().subscribe((data: any[]) => {
			this.examPeriods.data = data
			this.changeDetectorRefs.detectChanges();
		})
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.examPeriods.filter = filterValue.trim().toLowerCase();
	}

	announceSortChange(sortState: Sort) {
		if (sortState.direction) {
			this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
		} else {
			this._liveAnnouncer.announce('Sorting cleared');
		}
	}

	ngAfterViewInit() {
		this.examPeriods.sort = this.sort;
	}

	ngOnInit(): void {
		this.refresh()
	}

}
