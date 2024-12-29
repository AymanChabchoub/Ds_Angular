import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SalleService } from '../../../_Services/Salle/salle.service';
import { Salle } from '../../../models/Salle.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-salle-create',
  templateUrl: './salle-create.component.html',
  styleUrls: ['./salle-create.component.css']
})
export class SalleCreateComponent {
  salleForm!: FormGroup;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private salleService: SalleService,
    private router:Router
  ) {}

  ngOnInit(): void {
    // Initialisation du formulaire avec des champs et des validateurs
    this.salleForm = this.fb.group({
      nom: ['', [Validators.required]],
      capacite: [null, [Validators.required, Validators.min(1)]],
      description: ['', []]
    });
  }

  // Fonction appelée lors de la soumission du formulaire
  onSubmit(): void {
    if (this.salleForm.valid) {
      const salleData: Salle = this.salleForm.value;

      this.isLoading = true; // Affichage d'un spinner pendant l'envoi des données

      // Envoi des données au service pour créer la salle
      this.salleService.createSalle(salleData).subscribe({
        next: (data) => {
          console.log('Salle créée avec succès:', data);
          alert('Salle créée avec succès !');
          this.salleForm.reset();
          this.isLoading = false; // Retirer le spinner
          this.router.navigate(['dashboard'])
        },
        error: (err) => {
          console.error('Erreur lors de la création de la salle:', err);
          alert('Erreur lors de la création de la salle.');
          this.isLoading = false;
        }
      });
    } else {
      alert('Veuillez remplir tous les champs obligatoires.');
    }
  }
}
