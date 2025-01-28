import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from '../../_Services/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  message: string = '';
  isLoading: boolean = true;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      login: [''],
      password: [''],
      imageFile: [null],
      role: ['0'], // Default to "Student"
      cvFile: [null] // Optional CV file input
    });

    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }

  onRegister() {
    const formData = new FormData();
    if (this.registerForm.valid) {
      formData.append('FirstName', this.registerForm.get('firstName')?.value);
      formData.append('LastName', this.registerForm.get('lastName')?.value);
      formData.append('Login', this.registerForm.get('login')?.value);
      formData.append('Password', this.registerForm.get('password')?.value);
      formData.append('role', this.registerForm.get('role')?.value);
      console.log('role=',this.registerForm.get('role')?.value)
      const imageFile = this.registerForm.get('imageFile')?.value;
      if (imageFile) {
        formData.append('ImageFile', imageFile);
      }

      const cvFile = this.registerForm.get('cvFile')?.value;
      if (cvFile && this.registerForm.get('role')?.value === '1') {
        formData.append('CVFile', cvFile);
      }

      this.userService.register(formData).subscribe({
        
        next: () => {
          console.log(formData)
          this.openModal('Success', 'Verify your email to complete registration!', false);
        },
        error: () => {
          this.openModal('Error', 'Unknown error occurred.', true);
        }
      });
    } else {
      alert("Please fill out all required fields.");
    }
  }

  onFileSelected(event: any, fileType: string) {
    const file = event.target.files[0];
    if (file) {
      if (fileType === 'image') {
        this.registerForm.patchValue({ imageFile: file });
      } else if (fileType === 'cv') {
        this.registerForm.patchValue({ cvFile: file });
      }
    }
  }

  openModal(title: string, message: string, isError: boolean): void {
    this.dialog.open(ModalComponent, {
      height:'600px',
      width:'600px',
      data: { title, message, isError }
    });
  }
  
}
