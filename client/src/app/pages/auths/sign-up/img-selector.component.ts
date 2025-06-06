import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ImageUploadComponent } from "../../../shared/components/image-upload/image-upload.component";
@Component({
  selector: 'app-img-selector',
  imports: [CommonModule, ImageUploadComponent],
  template: `
    <h1>Carga una imagen</h1>
        <div class="content">
            <app-image-upload [multiple]="true" [limit]="5" (filesChanged)="onFiles($event)"></app-image-upload>
        </div>
        <div class="form-buttons">
            <a class="btn btn-secundary" (click)="onBack()">
                <div><i class="fa-solid fa-arrow-left"></i><span>regresar</span></div>
            </a>
            <a class="btn btn-primary" (click)="onNext()">
                <div><span>registrarme</span><i class="fa-solid fa-arrow-right"></i></div>
            </a>
        </div>
  `
})
export class ImgSelectorComponent {
  selectedFiles: File[] = [];

  @Output() imageUploaded = new EventEmitter<File[]>();
  @Output() next = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();

  onFiles(files: File[]) {
    this.selectedFiles = files;
    this.imageUploaded.emit(this.selectedFiles);
  }

  onNext() {
    if (this.selectedFiles.length) {
      this.next.emit();
    }
  }

  onBack() {
    this.back.emit();
  }
}
