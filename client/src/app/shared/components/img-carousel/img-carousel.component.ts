import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-img-carousel',
  imports: [CommonModule],
  templateUrl: './img-carousel.component.html',
  styleUrl: './img-carousel.component.scss'
})
export class ImgCarouselComponent {
  @Input() images: string[] = [
    'assets/img/products.jpg',
    'assets/img/products.jpg',
    'assets/img/products.jpg',
    'assets/img/products.jpg',
    'assets/img/products.jpg'
  ];

  currentIndex: number = 0;

  prevImage() {
    this.currentIndex =
      this.currentIndex === 0 ? this.images.length - 1 : this.currentIndex - 1;
  }

  nextImage() {
    this.currentIndex =
      this.currentIndex === this.images.length - 1 ? 0 : this.currentIndex + 1;
  }

  goToImage(index: number) {
    this.currentIndex = index;
  }

}
