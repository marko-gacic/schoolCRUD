import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseAPIService } from 'src/app/core/services/base-api.service';
import { Student } from 'src/app/modules/students/interfaces/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService extends BaseAPIService<Student> {
  protected override entityEndpoint: string = 'students'

  constructor(private _http: HttpClient) {
    super(_http);
  }

}
