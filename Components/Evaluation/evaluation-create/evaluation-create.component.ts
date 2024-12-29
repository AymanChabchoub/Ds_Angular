import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EvaluationService } from '../../../_Services/Evaluation/evaluation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../_Services/user/user.service';

@Component({
  selector: 'app-evaluation-create',
  templateUrl: './evaluation-create.component.html',
  styleUrls: ['./evaluation-create.component.css']
})
export class EvaluationCreateComponent {
  evaluationForm!: FormGroup;
  isLoading: boolean = true;
  formationId: number | null = null;
  currentUser: any = null;



  constructor(
    private fb: FormBuilder, 
    private evaluationService: EvaluationService,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private userService: UserService,

  ) {}

  ngOnInit(): void {
    // Initialisation du formulaire
    this.formationId = Number(this.activatedRoute.snapshot.paramMap.get('id') ?? 0);
    this.currentUser = this.userService.getCurrentUser();


    this.evaluationForm = this.fb.group({
      commentaire: ['', [Validators.required]],
      formationId: [this.formationId, [Validators.required, Validators.min(1)]],
      date: ['', [Validators.required]],  // Champ date
    });

    this.isLoading = false; // Spinner s'arrête après l'initialisation
  }

  onSubmit(): void {
    console.log('Form submitted:', this.evaluationForm.valid);
    console.log('Form data:', this.evaluationForm.value);
    if (this.evaluationForm.valid) {
      // Log avant d'envoyer les données
      console.log('Envoi des données au service', this.evaluationForm.value);
      this.evaluationService.createEvaluation(this.evaluationForm.value).subscribe({
        next: (data) => {
          console.log('Réponse du backend:', data);
          alert('Évaluation créée avec succès !');
          this.evaluationForm.reset();
          this.router.navigate([`formation_liste_formateur/${this.currentUser.id}`]);

        },
        error: (err) => {
          console.error('Erreur backend:', err);
          alert('Erreur lors de la création de l\'évaluation.');
        },
      });
    } else {
      alert('Veuillez remplir tous les champs obligatoires.');
    }
  }
}
