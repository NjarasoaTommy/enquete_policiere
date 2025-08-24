import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:4201';
  constructor(private http: HttpClient) {}
  getAllCrimesService(): Observable<any> {
    return this.http.get(`${this.apiUrl}/list_crimes`);
  }
  getAllAccusationsService(): Observable<any> {
    return this.http.get(`${this.apiUrl}/list_personnes_jugee`);
  }
  getAllFactsService(nom: string, crime: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/list_faits`, {
      nom: nom,
      crime: crime,
    });
  }
}
