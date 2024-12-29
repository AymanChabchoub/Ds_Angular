import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isLoading: boolean = true; // Par défaut, le spinner est affiché



  
  ngOnInit(): void {
    // Simulez un chargement de 3 secondes (par exemple pour attendre une réponse d'API)
    setTimeout(() => {
      this.isLoading = false; // Masquez le spinner après 3 secondes
    }, 3000);
  }
}
