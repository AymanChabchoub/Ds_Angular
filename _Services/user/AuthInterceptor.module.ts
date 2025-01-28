import { Injectable, OnInit } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { UserService } from './user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor,OnInit {
  constructor(private router: Router, private userService: UserService) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    console.log('token',token)

    if (token && this.isTokenExpired(token)) {
      console.warn('Token expiré, déconnexion en cours...');
      this.logoutAndRedirect(); // Fonction centralisée
      return throwError(() => new Error('Token expiré'));
    }

    const cloned = token
      ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : req;

    return next.handle(cloned).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          console.warn('Erreur 401 détectée, déconnexion en cours...');
          this.logoutAndRedirect(); // Déconnexion automatique
        }
        return throwError(() => error);
      })
    );
  }

  private isTokenExpired(token: string): boolean {

      const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
      console.log("expiry",expiry)
      const x= expiry * 1000 < Date.now();
      if(x)
      {
        console.log("le token est expirée")
      }
      return x;
  
  }
  

  private logoutAndRedirect(): void {
    this.userService.logout();
    localStorage.removeItem('token'); // Supprimer le token pour éviter les erreurs répétées
    this.router.navigate(['/']); // Rediriger vers la page de connexion
  }
}
