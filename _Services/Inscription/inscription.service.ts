import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inscription } from '../../models/Inscription.model';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {

  private apiUrl = 'https://localhost:7069/api/Inscription'; // Remplacez par l'URL de votre API backend

  constructor(private http: HttpClient) {}

  // Récupérer toutes les inscriptions
  getInscriptions(): Observable<Inscription[]> {
    return this.http.get<Inscription[]>(this.apiUrl);
  }

  // Récupérer une inscription par ID
  getInscription(id: number): Observable<Inscription> {
    return this.http.get<Inscription>(`${this.apiUrl}/${id}`);
  }
  getInscriptionsByUserId(userId: number): Observable<Inscription[]> {
    return this.http.get<Inscription[]>(`${this.apiUrl}/ByUser/${userId}`);
  }

  // Créer une nouvelle inscription
  createInscription(inscription: Inscription): Observable<Inscription> {
    return this.http.post<Inscription>(this.apiUrl, inscription);
  }

  // Mettre à jour une inscription
  updateInscription(id: number, inscription: Inscription): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, inscription);
  }

  // Supprimer une inscription
  deleteInscription(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}