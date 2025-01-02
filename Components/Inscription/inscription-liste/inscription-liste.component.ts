import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { InscriptionService } from '../../../_Services/Inscription/inscription.service';
import { Inscription } from '../../../models/Inscription.model';

@Component({
  selector: 'app-inscription-liste',
  templateUrl: './inscription-liste.component.html',
  styleUrls: ['./inscription-liste.component.css'],
})
export class InscriptionListeComponent implements OnInit {
  displayedColumns: string[] = ['index', 'userId', 'formationId', 'dateInscription','action'];
  dataSource: MatTableDataSource<Inscription> = new MatTableDataSource<Inscription>();
  isLoading: boolean = true;
  userId!:any

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private inscriptionService: InscriptionService, private route: ActivatedRoute,private router:Router) {}

  ngOnInit(): void {
      const userId=this.route.snapshot.params['userId']
      this.loadInscriptions(userId);
   
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadInscriptions(userId: number | null): void {
    this.isLoading = true;
    const request = userId
    this.userId=userId
    console.log("userId",userId)
    if(userId)
      this.inscriptionService.getInscriptionsByUserId(userId).subscribe((data)=>{
        this.dataSource.data=data
      })
    else
    {
      this.inscriptionService.getInscriptions().subscribe((data)=>{
        this.dataSource.data=data
      })
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  deleteInscription(id: number) {
    console.log(this.dataSource.data); // Log the entire data source
  
    if (!id) {
      alert('Inscription ID is undefined!');
      return;
    }
  
    this.inscriptionService.deleteInscription(id).subscribe({
      next: () => {
        alert('Désinscription avec succès');
        this.router.navigate(['etudiant_list'])
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  
}
