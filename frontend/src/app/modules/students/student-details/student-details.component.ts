import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { StudentService } from '../student.service'
import { Location } from '@angular/common';

@Component({
	selector: 'app-student-details',
	templateUrl: './student-details.component.html',
	styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit {
	student!: any;
	statusMessage!: string;

	constructor(private studentService: StudentService, private activatedRoute: ActivatedRoute, private _location: Location) { }

	ngOnInit(): void {
		let id: number = this.activatedRoute.snapshot.params['id']
		this.studentService.getById(id).subscribe((studentData) => {
			if (studentData == null) {
				this.statusMessage = 'Student with the specified index number does not exist';
			} else {
				this.student = studentData;
			}
		},
			(error) => {
				this.statusMessage = 'Problem with the student service. Please try again later';
			}
		)
	}

	goBack() {
		this._location.back();
	}
}
