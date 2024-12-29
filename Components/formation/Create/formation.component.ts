import { Component, OnInit } from '@angular/core';
import { FormationService } from '../../../_Services/formation/formation.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UserService } from '../../../_Services/user/user.service';

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css'],
})
export class FormationComponent implements OnInit {
  isLoading: boolean = true;
  salleId: number = 0;
  currentUser: any = null;

  // Initialize the form fields as variables
  sujet: string = '';
  duree: number | null = null;
  dateDebut: string = '';
  dateFin: string = '';
  formateurId: number | null = null;
  salleIdForm: number | null = null;

  constructor(
    private userService: UserService,
    private formationService: FormationService,
    private activatedRoute: ActivatedRoute,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser();
    console.log('The current user ID:', this.currentUser?.id);

    // Get salleId from route
    this.salleId = Number(this.activatedRoute.snapshot.paramMap.get('id') ?? 0);
    console.log('The salle ID:', this.salleId);

    // Assign the formateurId and salleIdForm based on the currentUser and salleId
    this.formateurId = this.currentUser?.user.id;
    this.salleIdForm = this.salleId;

    this.isLoading = false;
  }

  onSubmit(): void {
    if (this.sujet && this.duree && this.dateDebut && this.dateFin) {
      // Ensure formateurId and salleId are not null
      const formationData = {
        sujet: this.sujet,
        duree: this.duree,
        dateDebut: new Date(this.dateDebut),  // Convert string to Date
        dateFin: new Date(this.dateFin),      // Convert string to Date
        formateurId: this.currentUser?.id ?? 0,   // Default to 0 if null
        salleId: this.salleId ?? 0,       // Default to 0 if null
      };
  
      console.log('Form data:', formationData);
  
      // Call the service to add the formation
      this.formationService.addFormation(formationData).subscribe({
        next: (data) => {
          console.log('Backend response:', data);
          alert('Formation created successfully!');
          console.log("this.formateurId",this.formateurId)
          this.navigateTo(`formation_liste_formateur/${this.currentUser?.id ?? 0}`);

          this.resetForm();
        },
        error: (err) => {
          console.error('Backend error:', err);
          alert('Error occurred while creating formation.');
        },
      });
    } else {
      alert('Please fill all required fields.');
    }
  }
  
  

  // Reset form fields after submission
  resetForm(): void {
    this.sujet = '';
    this.duree = null;
    this.dateDebut = '';
    this.dateFin = '';
  }
  navigateTo(path:string)
  {
    this.router.navigate([path])
  }
  
}
