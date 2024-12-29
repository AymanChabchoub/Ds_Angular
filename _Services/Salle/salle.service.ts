import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Salle } from '../../models/Salle.model';

@Injectable({
  providedIn: 'root'
})
export class SalleService {

  private apiUrl = 'https://localhost:7069/api/Salle'; // Remplacez par l'URL de votre API backend

  constructor(private http: HttpClient) {}

  // Récupérer toutes les salles
  getSalles(): Observable<Salle[]> {
    return this.http.get<Salle[]>(this.apiUrl);
  }

  // Récupérer une salle par ID
  getSalle(id: number): Observable<Salle> {
    return this.http.get<Salle>(`${this.apiUrl}/${id}`);
  }

  // Créer une nouvelle salle
  createSalle(salle: Salle): Observable<Salle> {
    return this.http.post<Salle>(this.apiUrl, salle);
  }

  // Mettre à jour une salle
  updateSalle(id: number, salle: Salle): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, salle);
  }

  // Supprimer une salle
  deleteSalle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
