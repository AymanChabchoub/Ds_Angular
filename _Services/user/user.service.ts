import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {User} from '../../models/user.model'
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'https://localhost:7069/api/User'; // URL de base pour les appels API

  constructor(private http:HttpClient,private router:Router ) {}

  // Enregistrer un utilisateur
  register(user: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, user);
  }

  // Vérifier un utilisateur par email
  verifyEmail(token: string): Observable<any> {
    return this.http.get<string>(`${this.baseUrl}/verify`, {
      params: { token }
    });
  }
  getCurrentUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Vérifier si le token est expiré
  isTokenExpired(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return true;  // Si le token est absent, on considère qu'il est expiré.

    // Décoder le token (en supposant qu'il s'agit d'un JWT)
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expirationTime = payload.exp * 1000;  // Convertir en millisecondes
    const currentTime = new Date().getTime();

    return currentTime >= expirationTime;  // Vérifier si le token est expiré
  }

  // Se déconnecter
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['']);  // Rediriger vers la page de connexion
  }

  // Stocker l'utilisateur et le token dans localStorage
  storeUserData(token: string, user: User) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Tester l'envoi d'un email
  testEmail(email: string): Observable<any> {
    return this.http.get<string>(`${this.baseUrl}/test-email`, {
      params: { email }
    });
  }

  // Connexion d'un utilisateur
  login(loginRequest: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, loginRequest);
  }

  // Méthode pour gérer les appels spécifiques (facultatif)
  handleError(error: any): void {
    console.error('API error:', error);
  }
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }
  
}
