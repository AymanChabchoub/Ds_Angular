import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InscriptionService } from '../../../_Services/Inscription/inscription.service';
import { Inscription } from '../../../models/Inscription.model';


@Component({
  selector: 'app-inscription-liste',
  templateUrl: './inscription-liste.component.html',
  styleUrls: ['./inscription-liste.component.css']
})
export class InscriptionListeComponent implements OnInit {
  inscriptions: Inscription[] = [];
  userId: number | null = null;

  constructor(
    private inscriptionService: InscriptionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Check for `userId` in the route parameters
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId'] ? +params['userId'] : null;
      this.loadInscriptions();
    });
  }

  loadInscriptions(): void {
    if (this.userId) {
      this.inscriptionService.getInscriptionsByUserId(this.userId).subscribe(
        (data: Inscription[]) => {
          this.inscriptions = data;
        },
        error => {
          console.error('Error fetching inscriptions by user ID:', error);
        }
      );
    } else {
      this.inscriptionService.getInscriptions().subscribe(
        (data: Inscription[]) => {
          this.inscriptions = data;
        },
        error => {
          console.error('Error fetching all inscriptions:', error);
        }
      );
    }
  }
}
