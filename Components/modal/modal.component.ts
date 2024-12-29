import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  // Use @Inject(MAT_DIALOG_DATA) in the constructor to inject the dialog data
  constructor( @Inject(MAT_DIALOG_DATA) public data: any,private dialogRef: MatDialogRef<ModalComponent>,private router:Router) { }
  navigateTo(path:string)
  {
    this.router.navigate([path])
  }
}
