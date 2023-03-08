import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseAPIService } from 'src/app/core/services/base-api.service';
import { Professor } from './interfaces/professor';
import { Title } from './interfaces/titles';

@Injectable({
  providedIn: 'root'
})
export class ProfessorsService extends BaseAPIService<Professor>{
  protected override entityEndpoint: string = 'professors'

  constructor(private _http: HttpClient) {
    super(_http);
  }

  getProfessorTitles(): Observable<Title[]> {
    const url = `${this.apiUrl}titles`;
    return this._http.get<any>(url)
  }
}
