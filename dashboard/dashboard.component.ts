import { Component, OnInit } from '@angular/core';
import { UserService } from '../_Services/user/user.service';
import { FormationService } from '../_Services/formation/formation.service';
import { InscriptionService } from '../_Services/Inscription/inscription.service';
import { ChartDataset, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isLoading: boolean = true; // Par défaut, le spinner est affiché
  nbStudent: number = 0;
  nbTeacher: number = 0;
  nbFormation: number = 0;
  nbInscription: number = 0;
  tab_nom_formation:string[]=[]
  tab_nombre_inscription:number[]=[]

  chartDataPie: ChartDataset<'pie'>[] = [
    {
      data: [], // Initialize empty
      label: 'User Distribution',
      
    }
  ];
  chartLabelsPie: string[] = ['Student', 'Teacher'];
  chartOptionsPie: ChartOptions<'pie'> = {  };

  chartDataLine: ChartDataset<'line'>[] = [
    {
      data: [], // Initialize empty
      label: 'Nombre Inscription par formation',
      
    }
  ];
  chartLabelsLine: string[] = [];
  chartOptionsLine: ChartOptions<'line'> = {  };

  constructor(
    private userService: UserService,
    private formationService: FormationService,
    private inscriptionService: InscriptionService
  ) {}

  ngOnInit(): void {
    // Simulez un chargement de 3 secondes (par exemple pour attendre une réponse d'API)
    setTimeout(() => {
      this.isLoading = false; // Masquez le spinner après 3 secondes
    }, 3000);

    // Fetch Formation Data
    this.formationService.getFormations().subscribe((data) => {
      this.nbFormation = data.length;
    });

    // Fetch Inscription Data
    this.inscriptionService.getInscriptions().subscribe((data) => {
      this.nbInscription = data.length;
    });

    // Fetch User Data
    this.userService.getAllUsers().subscribe((data) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].role === 0) {
          this.nbStudent++;
        } else if (data[i].role === 1) {
          this.nbTeacher++;
        }
      }
      // Update Pie Chart Data
      this.chartDataPie[0].data = [this.nbStudent, this.nbTeacher];
      console.log(this.chartDataPie[0].data)
    });
    this.formationService.getFormations().subscribe((formations) => {
      for (let i = 0; i < formations.length; i++) {
        this.tab_nom_formation[i] = formations[i].sujet;
    
        if (formations[i].id !== undefined) {
          this.inscriptionService.getInscriptionsByFormationId(formations[i].id).subscribe((data) => {
            this.tab_nombre_inscription[i] = data.length; // Assign to the specific index in the array
          });
        } else {
          console.warn(`Formation at index ${i} has an undefined id.`);
        }
      }
      this.chartLabelsLine=this.tab_nom_formation
      this.chartDataLine[0].data=this.tab_nombre_inscription
    });
    
    
  }
}
