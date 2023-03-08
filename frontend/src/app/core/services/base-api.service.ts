import { environment } from '../../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseAPIService<T extends { id: number }> {
  protected apiUrl = environment.API_URL
  protected entityEndpoint!: string;

  constructor(private http: HttpClient) { }

  getAll(): Observable<T[]> {
    const url = `${this.apiUrl}${this.entityEndpoint}`
    return this.http.get<any>(url)
  }

  getById(id: number, options?: Object): Observable<T> {
    const url = `${this.apiUrl}${this.entityEndpoint}/${id}`;
    return this.http.get<any>(url)
  }

  update(entity: any, options?: Object): Observable<T> {
    const url = `${this.apiUrl}${this.entityEndpoint}/${entity.id}`;
    return this.http.put<any>(url, entity, options)
  }

  create(entity: any, options?: Object): Observable<T> {
    const url = `${this.apiUrl}${this.entityEndpoint}`;
    return this.http.post<any>(url, entity, options)
  }

  delete(id: number, options?: Object): Observable<T> {
    const url = `${this.apiUrl}${this.entityEndpoint}/${id}`;
    return this.http.delete<any>(url, options)
  }
}
