import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from '../Components/login/login.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { LeftNavComponent } from '../Components/left-nav/left-nav.component';
import { UpNavComponent } from '../Components/up-nav/up-nav.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from '../Components/Register/register.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';  // <-- Import FormsModule

import { ModalComponent } from '../Components/modal/modal.component';
import { FormationComponent } from '../Components/formation/Create/formation.component';
import { EvaluationCreateComponent } from '../Components/Evaluation/evaluation-create/evaluation-create.component';
import { SalleCreateComponent } from '../Components/Salle/salle-create/salle-create.component';
import { InscriptionCreateComponent } from '../Components/Inscription/inscription-create/inscription-create.component';
import { ListeUsersComponent } from '../Components/Users/liste-users/liste-users.component';
import { SalleListComponent } from '../Components/Salle/salle-list/salle-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormationFormateurComponent } from '../Components/formation/formation-formateur/formation-formateur.component';
import { FormationListComponent } from '../Components/formation/formation-list/formation-list.component';
import { ListeFormateurComponent } from '../Components/Users/liste-formateur/liste-formateur.component';
import { ListeEtudiantComponent } from '../Components/Users/liste-etudiant/liste-etudiant.component';
import { InscriptionListeComponent } from '../Components/Inscription/inscription-liste/inscription-liste.component';
import { AuthInterceptor } from '../_Services/user/AuthInterceptor.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    LeftNavComponent,
    UpNavComponent,
    RegisterComponent,
    ModalComponent,
    FormationComponent,
    EvaluationCreateComponent,
    SalleCreateComponent,
    InscriptionCreateComponent,
    ListeUsersComponent,
    SalleListComponent,
    FormationFormateurComponent,
    FormationListComponent,
    ListeFormateurComponent,
    ListeEtudiantComponent,
    InscriptionListeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule  // <-- Add FormsModule here
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },  // Enregistrer l'intercepteur

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
