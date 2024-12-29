import { Component } from '@angular/core';
import { UserService } from '../../../_Services/user/user.service';

@Component({
  selector: 'app-liste-users',
  templateUrl: './liste-users.component.html',
  styleUrls: ['./liste-users.component.css']
})
export class ListeUsersComponent {
  users: any[] = [];
  baseImageUrl: string = 'https://localhost:7069/img/'; // URL de base pour les images

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getAllUsers().subscribe((data) => {
      this.users = data;
    });
  }

  getPdfUrl(user: any): string {
    return this.baseImageUrl + user.cv; // Chemin complet vers le PDF
  }
}
