import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfessorsService } from '../professors.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-professor-details',
  templateUrl: './professor-details.component.html',
  styleUrls: ['./professor-details.component.scss']
})
export class ProfessorDetailsComponent implements OnInit {

  professor!: any;
  statusMessage!: string;

  constructor(private professorService: ProfessorsService, private activatedRoute: ActivatedRoute, private _location: Location) { }

  ngOnInit(): void {
    let id: number = this.activatedRoute.snapshot.params['id']
    this.professorService.getById(id).subscribe((professorData) => {
      if (professorData == null) {
        this.statusMessage = 'Professor with the specified index number does not exist';
      } else {
        this.professor = professorData;
      }
    },
      (error) => {
        this.statusMessage = 'Problem with the professor service. Please try again later';
      });
  }

  goBack() {
    this._location.back();
  }

}
