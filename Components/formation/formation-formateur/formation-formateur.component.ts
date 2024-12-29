import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { FormationService } from '../../../_Services/formation/formation.service';
import { Formation } from '../../../models/Formation.model';

@Component({
  selector: 'app-formation-formateur',
  templateUrl: './formation-formateur.component.html',
  styleUrls: ['./formation-formateur.component.css']
})
export class FormationFormateurComponent {
  displayedColumns: string[] = ['id', 'sujet', 'duree', 'dateDebut', 'dateFin', 'action'];
  dataSource: MatTableDataSource<Formation> = new MatTableDataSource<Formation>();
  isLoading: boolean = true;
  formateurId: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private formationService: FormationService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID du formateur depuis les paramètres de l'URL

    this.formateurId=Number(this.activatedRoute.snapshot.paramMap.get('id') ?? 0);
    console.log("this.formateurId",this.formateurId)
    this.fetchFormations()
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fetchFormations(): void {
    this.isLoading = true;
    this.formationService.getFormationByFormateurId(this.formateurId).subscribe({
      next: (data) => {
        console.log('data',data)
        this.dataSource.data = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des formations', error);
        this.isLoading = false;
      },
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  AddEvaluation(formationId: number): void {
    // Redirige vers le composant FormationComponent avec salleId comme paramètre de route
    this.router.navigate([`evaluation_create/${formationId}`]);
  }
}
