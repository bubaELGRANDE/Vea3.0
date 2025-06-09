import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-seller-post-detail',
  imports: [CommonModule],
  templateUrl: './seller-post-detail.component.html',
  styleUrl: './seller-post-detail.component.css'
})
export class SellerPostDetailComponent implements OnInit {
  activeTab: string = 'description'; // Pestaña activa por defecto
  underlineStyle: any = {}; // Estilo dinámico para la línea

  @ViewChild('tabHeader', { static: false }) tabHeader!: ElementRef;

  constructor() {}

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

}
