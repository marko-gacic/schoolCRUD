import { BaseAPIService } from 'src/app/core/services/base-api.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from './interfaces/subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService extends BaseAPIService<Subject> {

  protected override entityEndpoint: string = 'subjects'

  constructor(private _http: HttpClient) {
    super(_http);
  }

}
