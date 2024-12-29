import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InscriptionService } from '../../../_Services/Inscription/inscription.service';
import { Inscription } from '../../../models/Inscription.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../_Services/user/user.service';

@Component({
  selector: 'app-inscription-create',
  templateUrl: './inscription-create.component.html',
  styleUrls: ['./inscription-create.component.css']
})
export class InscriptionCreateComponent {
  inscriptionForm!: FormGroup;
  isLoading: boolean = false
  formationId:number=0
  currentUser: any = null;



  constructor(
    private fb: FormBuilder,
    private inscriptionService: InscriptionService,
    private activatedRoute:ActivatedRoute,
    private userService: UserService,
    private router:Router
  ) {}

  ngOnInit(): void {
    // Initialisation du formulaire avec des valeurs par défaut pour UserId et FormationId à 0
    this.formationId=Number(this.activatedRoute.snapshot.paramMap.get('id') ?? 0);
    this.currentUser = this.userService.getCurrentUser();


    this.inscriptionForm = this.fb.group({
      UserId: [this.currentUser.id, [Validators.required]],  // Valeur par défaut pour UserId
      FormationId: [this.formationId, [Validators.required]],  // Valeur par défaut pour FormationId
      DateInscription: [new Date(), [Validators.required]]  // Initialisation de la date avec la date actuelle
    });
  }

  // Fonction appelée lors de la soumission du formulaire
  onSubmit(): void {
    if (this.inscriptionForm.valid) {
      const inscriptionData: Inscription = this.inscriptionForm.value;

      this.isLoading = true; // Affichage d'un spinner pendant l'envoi des données

      // Envoi des données au service pour créer l'inscription
      this.inscriptionService.createInscription(inscriptionData).subscribe({
        next: (data) => {
          console.log('Inscription créée avec succès:', data);
          alert('Inscription réussie !');

          this.inscriptionForm.reset();
          this.isLoading = false; // Retirer le spinner
          this.router.navigate(['formation_list']);

        },
        error: (err) => {
          console.error('Erreur lors de la création de l\'inscription:', err);
          alert('Erreur lors de l\'inscription.');
          this.isLoading = false;
        }
      });
    } else {
      alert('Veuillez remplir tous les champs obligatoires.');
    }
  }
}
