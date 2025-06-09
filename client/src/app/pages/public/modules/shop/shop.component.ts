import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductsCardsComponent } from "../../components/products-cards/products-cards.component";
import { CommonModule } from '@angular/common';
import { ProductModalComponent } from "../../components/product-modal/product-modal.component";
import { IProduct, IProductResponse } from '../../interface/IPublishing';
import { PublishingService } from '../../services/publishing.service';
import { SpinnerService } from '../../../../shared/services/spinner.service';
import { ToastrService } from 'ngx-toastr';
import { formatHttpError } from '../../../../core/helpers/formatHttpError';
import { TagListComponent } from "../../components/tag-list/tag-list.component";
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shop',
  imports: [FormsModule, CommonModule, RouterModule, ProductsCardsComponent, ProductModalComponent, TagListComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {


  @ViewChild('shopPanel') shopPanel!: ElementRef;
  onModal: boolean = false
  searchInput: string = '';
  currentPublishing?: IProduct;
  currentTag: any[] = []
  filteredPubli: IProduct[] = [];

  minPrice: number | null = null;
  maxPrice: number | null = null;

  currentPage: IProductResponse = {
    data: [],
    pagination: {
      page: 1,
      limit: 1,
      total: 1,
      pages: 1
    }
  };

  constructor(
    private publishingService: PublishingService,
    private spinnerService: SpinnerService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.reload()
  }

  resetPage(): void {
    window.location.reload();
  }

  onTag(event: any) {
    this.currentTag = event
    this.applyAllFilters();
  }

  scrollToShopPanel(): void {
  if (this.shopPanel) {
    this.shopPanel.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}


  applyAllFilters(): void {
    let filtered = [...this.currentPage.data];

    //? Filtro por categorías
    if (this.currentTag.length > 0) {
      const selectedIds = new Set(this.currentTag.map(tag => Number(tag.id)));
      filtered = filtered.filter(product =>
        product.publishingCategories.some(pc =>
          selectedIds.has(Number(pc.category.id))
        )
      );
    }

    //? Filtro por precio
    if (typeof this.minPrice === 'number') {
      filtered = filtered.filter(p => Number(p.price) >= this.minPrice!);
    }

    if (typeof this.maxPrice === 'number') {
      filtered = filtered.filter(p => Number(p.price) <= this.maxPrice!);
    }

    //? Filtro por titulo
    if (this.searchInput.trim()) {
      const term = this.searchInput.trim().toLowerCase();
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(term)
      );
    }

    this.filteredPubli = filtered;

    if (this.filteredPubli.length === 0) {
      this.toastr.info('No se encontraron productos con los filtros aplicados.', 'Sin resultados');
    }

    this.scrollToShopPanel();
  }

  showModal(event: boolean) {
    if (event) {
      this.onModal = true;
    }
    else {
      this.onModal = false;
      this.currentPublishing = undefined
    }
  }

  opdenModal(event: IProduct) {
    this.currentPublishing = event
    this.showModal(true)
  }

  reload() {
    this.spinnerService.show()
    this.publishingService.getAll().subscribe({
      next: (response) => {
        this.currentPage.data = response;

        this.filteredPubli = this.currentPage.data;
      },
      error: (err) => {
        this.spinnerService.forceHide()
        const { message, errors } = formatHttpError(err);
        this.toastr.error(errors, message)
      },
      complete: () => this.spinnerService.hide()
    })
  }
}

