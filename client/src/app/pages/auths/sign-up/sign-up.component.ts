import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ImageUploadComponent } from "../../../shared/components/image-upload/image-upload.component";

@Component({
  selector: 'app-sign-up',
  imports: [CommonModule, ImageUploadComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {

  selectedFiles: File[] = [];

  onFiles(files: File[]) {
    this.selectedFiles = files;
  }

  next: boolean = false;

  onNext() {
    this.next = true;
  }

  onBack() {
    this.next = false;
  }
}
