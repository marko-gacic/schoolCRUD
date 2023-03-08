import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DeleteDialogComponent } from 'src/app/shared/components/delete-dialog/delete-dialog.component';
import { AddProfessorDialogComponent } from './dialogs/add-professor-dialog/add-professor-dialog.component';
import { EditProfessorComponent } from './dialogs/edit-professor/edit-professor.component';
import { Professor } from './interfaces/professor';
import { ProfessorsService } from './professors.service';

@Component({
	selector: 'app-professors',
	templateUrl: './professors.component.html',
	styleUrls: ['./professors.component.scss'],
})
export class ProfessorsComponent implements OnInit {

	displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'details', 'edit', 'delete'];
	professors = new MatTableDataSource<Professor>()
	value = '';

	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;
	@ViewChild(MatTable) table!: MatTable<Professor>;

	constructor(private professorService: ProfessorsService, private _liveAnnouncer: LiveAnnouncer, public dialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef) { }

	openAddDialog() {
		this.dialog.open(AddProfessorDialogComponent).afterClosed().subscribe(dialogResult => {
			this.refresh();
		})
	}

	openEditDialog(professor: Professor) {
		this.dialog.open(EditProfessorComponent, { data: professor }).afterClosed().subscribe(result => {
			this.refresh()
		})
	}

	deleteProfessor(id: number) {
		this.professorService.delete(id).subscribe(() => {
			this.refresh()
		})
	}

	openDeleteDialog(professor: Professor) {
		this.dialog.open(DeleteDialogComponent, {
			data:
			{
				title: 'Are you sure?', message: `Do you want to delete professor ${professor.firstName}`, confirmButton: "Delete", action: () => this.deleteProfessor(professor.id)
			}
		})
	}

	refresh() {
		this.professorService.getAll().subscribe((data: Professor[]) => {
			this.professors.data = data
			this.professors.paginator = this.paginator;
			this.changeDetectorRefs.detectChanges();
		})
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.professors.filter = filterValue.trim().toLowerCase();
	}

	announceSortChange(sortState: Sort) {
		if (sortState.direction) {
			this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
		} else {
			this._liveAnnouncer.announce('Sorting cleared');
		}
	}

	ngAfterViewInit() {
		this.professors.sort = this.sort;
		this.professors.paginator = this.paginator
	}

	ngOnInit(): void {
		this.refresh()
	}
}

