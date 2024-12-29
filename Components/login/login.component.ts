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
    if (this.useFaceRecognition && this.imageFile) {
      this.loginRequest.append('imageFile', this.imageFile);
      this.loginRequest.append('useFaceRecognition', 'true');
    } else {
      this.loginRequest.append('useFaceRecognition', 'false');
    }

    this.authService.login(this.loginRequest).subscribe(
      (response) => {
        const currentUser = response.user;
        const authToken = response.token;
        console.log('currentUser:', currentUser);  // Check if User is part of the response
        console.log("response",response);

        this.authService.storeUserData(authToken, currentUser);
      },
      (error) => {
        console.error('Login failed', error);
        alert('Login failed! Please check your credentials.');
      }
    );
  }
}
