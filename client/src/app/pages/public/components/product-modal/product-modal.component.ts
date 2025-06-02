import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ImgCarouselComponent } from "../../../../shared/components/img-carousel/img-carousel.component";
import { Ipublishing } from '../../interfaces/Ipublishing';

@Component({
  selector: 'app-product-modal',
  imports: [CommonModule, ImgCarouselComponent],
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.scss'
})
export class ProductModalComponent implements OnInit {

  @Input() publishing?: Ipublishing;
  @Output() closeModal = new EventEmitter<boolean>;

  activeTab: string = 'description'; // Pestaña activa por defecto
  underlineStyle: any = {}; // Estilo dinámico para la línea

  @ViewChild('tabHeader', { static: false }) tabHeader!: ElementRef;

  constructor() { }


  ngOnInit(): void {
    // Inicializar la posición de la línea al cargar el componente
    setTimeout(() => this.updateUnderlinePosition(), 0);
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
    this.updateUnderlinePosition();
  }

  updateUnderlinePosition(): void {
    const tabs = document.querySelectorAll('.tab-item');
    const activeTabElement = Array.from(tabs).find(tab =>
      tab.classList.contains('active')
    ) as HTMLElement;
    if (activeTabElement) {
      const width = activeTabElement.offsetWidth;
      const left = activeTabElement.offsetLeft;

      this.underlineStyle = {
        width: `${width}px`,
        transform: `translateX(${left}px)`
      };
    }
  }

  onClose(): void {
    this.closeModal.emit(false)
  }

}
