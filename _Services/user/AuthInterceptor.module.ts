import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');  // Récupérer le jeton du localStorage

    // Si le jeton existe, on le rajoute dans les en-têtes de la requête
    if (token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`  // Ajouter le jeton à l'en-tête Authorization
        }
      });
      return next.handle(cloned);  // Renvoie la requête modifiée
    }

    // Si pas de jeton, on envoie la requête telle quelle
    return next.handle(req);
  }
}
