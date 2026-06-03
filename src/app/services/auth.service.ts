import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { LoginResponse } from '../interfaces/login-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
url: string = "http://localhost:3000/api"
  // Registrera konto
  register(user: User): Observable<any> {
    return this.http.post<any>(`${this.url}/auth/register`, user);
  }

  // Logga in (använder loginresponse interface)
  login(user: User): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.url}/auth/login`, user);
  }
}
