import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_Services/user/user.service';
import { User } from '../../models/user.model';
@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.css']
})
export class LeftNavComponent implements OnInit {
  constructor(private userService: UserService) {}

  currentUser: any = null;
  FormateurId!:number
  baseImageUrl: string = 'https://localhost:7069/img/'; // URL de base pour les images

  ngOnInit(): void {
    
    this.currentUser = this.userService.getCurrentUser();  // Fetch the current user
    this.FormateurId=this.currentUser.id
    console.log("this.currentUser",this.currentUser)
  }          


  logout(): void {
    this.userService.logout();  // Call logout method to remove user data and token
  }
}
