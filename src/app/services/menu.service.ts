import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuItem } from '../interfaces/menu-item'; // 

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private http = inject(HttpClient);
  private url: string = "http://localhost:3000/api/menu"; 

  // 1. Hämta hela menyn (Öppen för alla)
  getMenuItems(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(this.url);
  }

  // Hjälpmetod för att hämta token och skapa headers för de skyddade routerna
  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }

  // Lägg till nytt bakverk (Skyddad)
  addMenuItem(item: MenuItem): Observable<MenuItem> {
    return this.http.post<MenuItem>(this.url, item, this.getAuthHeaders());
  }

  //Uppdatera bakverk (Skyddad)
  updateMenuItem(id: string, item: MenuItem): Observable<MenuItem> {
    return this.http.put<MenuItem>(`${this.url}/${id}`, item, this.getAuthHeaders());
  }

  //Radera bakverk (Skyddad)
  deleteMenuItem(id: string): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`, this.getAuthHeaders());
  }
}