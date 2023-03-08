import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { DeleteDialogComponent } from 'src/app/shared/components/delete-dialog/delete-dialog.component';
import { AddSubjectDialogComponent } from './dialogs/add-subject-dialog/add-subject-dialog.component';
import { EditSubjectDialogComponent } from './dialogs/edit-subject-dialog/edit-subject-dialog.component';
import { Subject } from './interfaces/subject';
import { SubjectsService } from './subjects.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['id', 'name', 'description', 'numberOfEsp', 'semester', 'edit', 'delete'];
  subjects = new MatTableDataSource<Subject>()
  value = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Subject>;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    public dialog: MatDialog,
    private subjectService: SubjectsService,
    private changeDetectorRefs: ChangeDetectorRef) { }

  openAddDialog() {
    this.dialog.open(AddSubjectDialogComponent).afterClosed().subscribe(result => {
      this.refresh()
    })
  }

  openEditDialog(subject: Subject) {
    this.dialog.open(EditSubjectDialogComponent, { data: subject }).afterClosed().subscribe(result => {
      this.refresh()
    })
  }

  deleteSubject(id: number) {
    this.subjectService.delete(id).subscribe(() => {
      this.refresh()
    })
  }

  openDeleteDialog(subject: Subject) {
    this.dialog.open(DeleteDialogComponent, {
      data: {
        title: 'Are you sure?', message: `Do you want to delete subject ${subject.name}`, confirmButton: "Delete", action: () => this.deleteSubject(subject.id)
      }
    })
  }

  refresh() {
    this.subjectService.getAll().subscribe((data: Subject[]) => {
      this.subjects.data = data
      this.subjects.paginator = this.paginator;
      this.changeDetectorRefs.detectChanges();
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.subjects.filter = filterValue.trim().toLowerCase();
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngAfterViewInit() {
    this.subjects.sort = this.sort;
    this.subjects.paginator = this.paginator
  }

  ngOnInit(): void {
    this.refresh()
  }

}
