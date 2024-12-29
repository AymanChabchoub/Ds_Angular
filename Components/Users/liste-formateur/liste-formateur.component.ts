import { Component } from '@angular/core';
import { UserService } from '../../../_Services/user/user.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-liste-formateur',
  templateUrl: './liste-formateur.component.html',
  styleUrls: ['./liste-formateur.component.css']
})
export class ListeFormateurComponent {
 users: any[] = [];
  baseImageUrl: string = 'https://localhost:7069/img/'; // URL de base pour les images
  i!:number
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getAllUsers().subscribe((data:User[]) => {
      for(this.i=0;this.i<data.length;this.i++)
      {
        if(data[this.i].role==1)
        {
          this.users.push(data[this.i])
        }
      }
      console.log(this.users)
    });
  }

  getPdfUrl(user: any): string {
    return this.baseImageUrl + user.cv; // Chemin complet vers le PDF
  }
}
