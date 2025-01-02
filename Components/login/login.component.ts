import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_Services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading: boolean = true;

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }

  loginRequest: FormData = new FormData();
  email: string = '';
  password: string = '';
  imageFile: File | null = null;
  useFaceRecognition: boolean = false;

  constructor(private authService: UserService, private router: Router) {}

  onEmailChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.email = target.value;  // Ensure you are getting a string
  }

  onPasswordChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.password = target.value;  // Ensure you are getting a string
  }

  onFileChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      this.imageFile = target.files[0];
    }
  }

  enableFaceRecognition(): void {
    this.useFaceRecognition = true;
  }

  login(): void {
    this.loginRequest.append('email', this.email);
    this.loginRequest.append('password', this.password);
    
    // Vérifier si la reconnaissance faciale est activée
    if (this.useFaceRecognition && this.imageFile) {
      this.loginRequest.append('imageFile', this.imageFile);
      this.loginRequest.append('useFaceRecognition', 'true');
    } else {
      this.loginRequest.append('useFaceRecognition', 'false');
    }
  
    // Appeler le service pour effectuer la requête de login
    this.authService.login(this.loginRequest).subscribe(
      (response) => {
        const currentUser = response.user;
        const authToken = response.token;
  
        console.log('Utilisateur actuel:', currentUser);
        console.log('Jeton de réponse:', authToken);
  
        // Stocker les informations dans le localStorage
        this.authService.storeUserData(authToken, currentUser);
  
        // Rediriger vers la page d'accueil ou une autre page après la connexion
        if(currentUser.role===1)
          this.router.navigate(['formation_liste_formateur',currentUser.id]);
        else if (currentUser.role===0)
          this.router.navigate(['formation_list'])
        else
          this.router.navigate(['dashboard'])
      },
      (error) => {
        console.error('Échec de la connexion', error);
        alert('Échec de la connexion ! Veuillez vérifier vos informations de connexion.');
      }
    );
  }
  
}
