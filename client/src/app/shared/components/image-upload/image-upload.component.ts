import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-image-upload',
  imports: [],
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.scss'
})
export class ImageUploadComponent {
  @Input() multiple: boolean = false;
  @Input() limit: number = 1;

  @Output() filesChanged = new EventEmitter<File[]>();

  previews: string[] = [];
  selectedFiles: File[] = [];
  isDragging = false;

  get isLimitReached(): boolean {
    return this.selectedFiles.length >= this.limit;
  }

  handleFileInput(event: Event) {
    if (this.isLimitReached) return;

    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    this.processFiles(input.files);
    input.value = '';
  }

  handleDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;

    if (this.isLimitReached) return;
    if (event.dataTransfer?.files) {
      this.processFiles(event.dataTransfer.files);
    }
  }

  onDragOver(event: DragEvent) {
    if (!this.isLimitReached) {
      event.preventDefault();
      this.isDragging = true;
    }
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
  }

  processFiles(fileList: FileList) {
    const incoming = Array.from(fileList);
    const remaining = this.limit - this.selectedFiles.length;
    const toAdd = incoming.slice(0, remaining);

    toAdd.forEach(file => {
      this.selectedFiles.push(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          this.previews.push(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    });

    this.filesChanged.emit(this.selectedFiles);
  }

  removeImage(index: number) {
    this.previews.splice(index, 1);
    this.selectedFiles.splice(index, 1);
    this.filesChanged.emit(this.selectedFiles);
  }
}
