import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Formation } from '../../models/Formation.model';

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  private baseUrl = 'https://localhost:7069/api/Formation'; // Remplacez par l'URL de votre backend

  constructor(private http: HttpClient) {}

  // Récupérer toutes les formations
  getFormations(): Observable<Formation[]> {
    return this.http.get<Formation[]>(`${this.baseUrl}`);
  }

  // Récupérer une formation par ID
  getFormationById(id: number): Observable<Formation> {
    return this.http.get<Formation>(`${this.baseUrl}/${id}`);
  }
  getFormationByFormateurId(formateurId: number): Observable<Formation[]> {
    return this.http.get<Formation[]>(`${this.baseUrl}/byFormateur/${formateurId}`);
  }

  // Ajouter une nouvelle formation
  addFormation(formation: Formation): Observable<Formation> {
    return this.http.post<Formation>(`${this.baseUrl}`, formation);
  }

  // Mettre à jour une formation existante
  updateFormation(id: number, formation: Formation): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, formation);
  }

  // Supprimer une formation
  deleteFormation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
