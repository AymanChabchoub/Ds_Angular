import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Salle } from '../../../models/Salle.model';
import { SalleService } from '../../../_Services/Salle/salle.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-salle-list',
  templateUrl: './salle-list.component.html',
  styleUrls: ['./salle-list.component.css'],
})
export class SalleListComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'nom', 'capacite', 'description','action'];
  dataSource: MatTableDataSource<Salle> = new MatTableDataSource<Salle>();
  isLoading: boolean = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private salleService: SalleService,private router:Router) {}

  ngOnInit(): void {
    this.fetchSalles();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fetchSalles(): void {
    this.salleService.getSalles().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des salles', error);
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
  AddFormation(salleId: number): void {
    // Redirige vers le composant FormationComponent avec salleId comme paramètre de route
    this.navigateTo(`formation_create/${salleId}`);
  }
  
  navigateTo(path:string)
  {
    this.router.navigate([path])
  }
}
