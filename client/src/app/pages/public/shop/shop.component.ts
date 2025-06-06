import { Component, OnInit } from '@angular/core';
import { ProductsCardsComponent } from "../modules/publishing/components/products-cards/products-cards.component";
import { CommonModule } from '@angular/common';
import { ProductModalComponent } from "../modules/publishing/components/product-modal/product-modal.component";
import { IProduct, IProductResponse } from '../modules/publishing/Ipublishing';
import { PublishingService } from '../modules/publishing/publishing.service';
import { SpinnerService } from '../../../shared/services/spinner.service';
import { ToastrService } from 'ngx-toastr';
import { formatHttpError } from '../../../core/helpers/formatHttpError';


@Component({
  selector: 'app-shop',
  imports: [CommonModule, ProductsCardsComponent, ProductModalComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {

  onModal: boolean = false
  currentPublishing?: IProduct;
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
        console.log(this.currentPage);
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

