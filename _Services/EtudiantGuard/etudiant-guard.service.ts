import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class EtudiantGuardService {

  //Etudiant guard car le role est 0
    constructor(private authService: UserService, private router: Router) {}
  
    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): boolean {
      
      // Récupérer l'utilisateur actuel depuis AuthService
      const user = this.authService.getCurrentUser();
      console.log("current user in canActivate is:", user);
  
      // Vérifier si l'utilisateur est connecté et a un rôle valide
      if (user && user.role !== undefined) {
        if ((typeof user.role === 'string' && (user.role === 'admin' || user.role === 'etudiant')) ||
            (typeof user.role === 'number' && (user.role === 2 || user.role === 0))) {
          return true;  // L'utilisateur est autorisé
        }
      }
  
      // Rediriger vers la page de login si l'accès est refusé
      this.router.navigate(['/login']);
      return false;  // Refuser l'accès
    }
  }
  
  

