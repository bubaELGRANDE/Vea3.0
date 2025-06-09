import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ImgCarouselComponent } from "../../../../shared/components/img-carousel/img-carousel.component";
import { IProduct } from '../../interface/IPublishing';
import { RouterModule } from '@angular/router';
import { TruncatePipe } from "../../../../core/pipes/truncate.pipe";
import { WishtlistService } from '../../services/wishtlist.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-modal',
  imports: [CommonModule, ImgCarouselComponent, RouterModule, TruncatePipe],
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.scss'
})
export class ProductModalComponent implements OnInit {

  @Input() publishing?: IProduct;
  @Output() closeModal = new EventEmitter<boolean>;
  inWishlist: boolean = false;

  activeTab: string = 'description'; // Pestaña activa por defecto
  underlineStyle: any = {}; // Estilo dinámico para la línea

  @ViewChild('tabHeader', { static: false }) tabHeader!: ElementRef;

  constructor(private wishlistService: WishtlistService, private toastr: ToastrService) { }


  ngOnInit(): void {
    setTimeout(() => this.updateUnderlinePosition(), 0);
    if (this.publishing) {
      this.inWishlist = this.wishlistService.isInWishlist(this.publishing?.id);
    }
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
    this.updateUnderlinePosition();
  }


  addWisht() {
    if (this.publishing) {
      if (!this.inWishlist) {
        this.wishlistService.addToWishlist(this.publishing)
        this.toastr.info('Publicación agregada a favoritos')
      }
      else {
        this.wishlistService.removeFromWishlist(this.publishing.id)
        this.toastr.warning('Publicación eliminada a favoritos')
      }

      this.inWishlist = this.wishlistService.isInWishlist(this.publishing.id);
    }
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
