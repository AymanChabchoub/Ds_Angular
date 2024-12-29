import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evaluation } from '../../models/Evaluation.model';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  private apiUrl = 'https://localhost:7069/api/Evaluation'; // Remplacez par l'URL de votre API backend

  constructor(private http: HttpClient) {}

  // Récupérer toutes les évaluations
  getEvaluations(): Observable<Evaluation[]> {
    return this.http.get<Evaluation[]>(this.apiUrl);
  }

  // Récupérer une évaluation par ID
  getEvaluation(id: number): Observable<Evaluation> {
    return this.http.get<Evaluation>(`${this.apiUrl}/${id}`);
  }

  // Créer une nouvelle évaluation
  createEvaluation(evaluation: Evaluation): Observable<Evaluation> {
    return this.http.post<Evaluation>(this.apiUrl, evaluation);
  }

  // Mettre à jour une évaluation
  updateEvaluation(id: number, evaluation: Evaluation): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, evaluation);
  }

  // Supprimer une évaluation
  deleteEvaluation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
