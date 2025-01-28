import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Salle } from '../../../models/Salle.model';
import { SalleService } from '../../../_Services/Salle/salle.service';
import { Router } from '@angular/router';
import { User } from '../../../models/user.model';
import { UserService } from '../../../_Services/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import {ConfirmDeleteComponent} from '../../confirm-delete/confirm-delete.component'

@Component({
  selector: 'app-salle-list',
  templateUrl: './salle-list.component.html',
  styleUrls: ['./salle-list.component.css'],
})
export class SalleListComponent implements AfterViewInit {
  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<Salle> = new MatTableDataSource<Salle>();
  isLoading: boolean = true;
  currentUser: User | null = null;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private salleService: SalleService,private router:Router,private userService:UserService,private dialog:MatDialog) {}

  ngOnInit(): void {
    this.fetchSalles();
    this.currentUser=this.userService.getCurrentUser();
    this.displayedColumns = ['id', 'nom', 'capacite', 'description', 'action'];
  if (this.isAdmin()) {
    this.displayedColumns.push('modifier', 'supprimer');
  }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  isAdmin(): boolean {
    return this.currentUser?.role === 2;
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
  open(id: number): void {
    let dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      height: '200px',
      width: '300px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.salleService.deleteSalle(id).subscribe((data) => {
          window.location.reload();
        });
      }
    });
  }
}
