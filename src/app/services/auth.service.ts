import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, tap } from 'rxjs';
import { User } from '../interfaces/user';
import { LoginResponse } from '../interfaces/login-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  
  url: string = "http://localhost:3000/api";
  token = signal<string>("");

  constructor() {
    // Hämtar bara token om koden körs i webbläsaren efter en tråkig krasch
    if (isPlatformBrowser(this.platformId)) {
      this.token.set(localStorage.getItem("token") || "");
    }
  }

  // Registrera konto
  register(user: User): Observable<any> {
    return this.http.post<any>(`${this.url}/auth/register`, user);
  }

  // Logga in
  login(user: User): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.url}/auth/login`, user).pipe(
      tap((res: LoginResponse) => {
        this.token.set(res.response.token);
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem("token", res.response.token);
        }
      })
    );
  }
}