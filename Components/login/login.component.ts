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
    const loginRequest = new FormData(); // Create FormData for file upload
  
    loginRequest.append('email', this.email);
    loginRequest.append('password', this.password);
  
    // Include face recognition data if enabled
    if (this.useFaceRecognition && this.imageFile) {
      loginRequest.append('imageFile', this.imageFile);
      loginRequest.append('useFaceRecognition', 'true');
    } else {
      loginRequest.append('useFaceRecognition', 'false');
    }
  
    // Call the login service
    this.authService.login(loginRequest).subscribe(
      (response) => {
        const currentUser = response.user;
        const authToken = response.token;
  
        console.log('Utilisateur actuel:', currentUser);
        console.log('Jeton de réponse:', authToken);
  
        // Store user data and token
        this.authService.storeUserData(authToken, currentUser);
  
        // Redirect based on role
        if (currentUser.role === 1)
          this.router.navigate(['formation_liste_formateur', currentUser.id]);
        else if (currentUser.role === 0)
          this.router.navigate(['formation_list']);
        else
          this.router.navigate(['dashboard']);
      },
      (error) => {
        console.error('Échec de la connexion', error);
        alert('Échec de la connexion ! Veuillez vérifier vos informations de connexion.');
      }
    );
  }
  
  
}
