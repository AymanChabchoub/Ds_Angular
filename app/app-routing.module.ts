import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../Components/login/login.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { LeftNavComponent } from '../Components/left-nav/left-nav.component';
import { UpNavComponent } from '../Components/up-nav/up-nav.component';
import { RegisterComponent } from '../Components/Register/register.component';
import { FormationComponent } from '../Components/formation/Create/formation.component';
import { EvaluationCreateComponent } from '../Components/Evaluation/evaluation-create/evaluation-create.component';
import { SalleCreateComponent } from '../Components/Salle/salle-create/salle-create.component';
import { ListeUsersComponent } from '../Components/Users/liste-users/liste-users.component';
import { SalleListComponent } from '../Components/Salle/salle-list/salle-list.component';
import { FormationFormateurComponent } from '../Components/formation/formation-formateur/formation-formateur.component';
import { FormationListComponent } from '../Components/formation/formation-list/formation-list.component';
import { InscriptionCreateComponent } from '../Components/Inscription/inscription-create/inscription-create.component';
import { ListeFormateurComponent } from '../Components/Users/liste-formateur/liste-formateur.component';
import { ListeEtudiantComponent } from '../Components/Users/liste-etudiant/liste-etudiant.component';
import { InscriptionListeComponent } from '../Components/Inscription/inscription-liste/inscription-liste.component';


const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  { path: 'formation_create/:id', component: FormationComponent },
  { path: 'evaluation_create/:id', component: EvaluationCreateComponent },
  { path: 'inscription_create/:id', component: InscriptionCreateComponent },
  { path: 'formation_liste_formateur/:id', component: FormationFormateurComponent},
  { path:'formateur_list',component:ListeFormateurComponent},
  { path:'formation_list',component:FormationListComponent},
  {path:'users',component:ListeUsersComponent},
  {path:'salle_create',component:SalleCreateComponent},
  {path:'dashboard',component:DashboardComponent},
  {path :'left',component:LeftNavComponent},
  {path:'up',component:UpNavComponent},
  {path:'salle_list',component:SalleListComponent},
  {path:'etudiant_list',component:ListeEtudiantComponent},
  { path: 'inscription_list', component: InscriptionListeComponent },

  { path: 'inscription_list/:userId', component: InscriptionListeComponent }
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
