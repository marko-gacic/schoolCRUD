import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    const user = { username, password }
    const url = `${this.apiUrl}/login`
    return this.http.post<any>(url, user)
  }
}
