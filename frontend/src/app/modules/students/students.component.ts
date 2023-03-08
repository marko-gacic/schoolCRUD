import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Student } from 'src/app/modules/students/interfaces/student';
import { StudentService } from './student.service';
import { DeleteDialogComponent } from 'src/app/shared/components/delete-dialog/delete-dialog.component';
import { ModalComponent } from './modal/modal.component';

@Component({
	selector: 'app-student',
	templateUrl: './students.component.html',
	styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements AfterViewInit, OnInit {
	displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'details', 'edit', 'delete'];
	students = new MatTableDataSource<Student>()
	value = '';

	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;
	@ViewChild(MatTable) table!: MatTable<Student>;

	constructor(
		private _liveAnnouncer: LiveAnnouncer,
		public dialog: MatDialog,
		private studentService: StudentService,
		private changeDetectorRefs: ChangeDetectorRef) { }

	createStudent(student: Student) {
		this.studentService.create(student).subscribe(() => {
			this.refresh()
		})
	}

	updateStudent(student: Student) {
		this.studentService.update(student).subscribe(() => {
			this.refresh()
		})
	}

	// -> If there is data passed -> Edit mode -> Populate table and call update method
	openModal(student?: Student) {
		if (student) {
			this.dialog.open(ModalComponent, {
				data: {
					student, actionUpdate: (student: Student) => this.updateStudent(student)
				}
			})
		} else {
			this.dialog.open(ModalComponent, {
				data: {
					actionCreate: (student: Student) => this.createStudent(student)
				}
			})
		}
	}

	deleteStudent(id: number) {
		this.studentService.delete(id).subscribe(() => {
			this.refresh()
		})
	}

	openDeleteDialog(student: Student) {
		this.dialog.open(DeleteDialogComponent, {
			data:
			{
				title: 'Are you sure?', message: `Do you want to delete student ${student.firstName}`, confirmButton: "Delete", action: () => this.deleteStudent(student.id)
			}
		})
	}

	refresh() {
		this.studentService.getAll().subscribe((data: Student[]) => {
			this.students.data = data
			this.students.paginator = this.paginator;
			this.changeDetectorRefs.detectChanges();
		})
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.students.filter = filterValue.trim().toLowerCase();
	}

	announceSortChange(sortState: Sort) {
		if (sortState.direction) {
			this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
		} else {
			this._liveAnnouncer.announce('Sorting cleared');
		}
	}

	ngAfterViewInit() {
		this.students.sort = this.sort;
		this.students.paginator = this.paginator
	}

	ngOnInit(): void {
		this.refresh()
	}
}
