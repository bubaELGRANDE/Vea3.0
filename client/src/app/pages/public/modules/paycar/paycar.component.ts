import { Component, OnInit } from '@angular/core';
import { StripeCheckoutComponent } from './stripe-checkout/stripe-checkout.component';
import { EfectivoComponent } from './efectivo/efectivo.component';
import { PaypalComponent } from './paypal/paypal.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { PublishingService } from '../../services/publishing.service';
import { formatHttpError } from '../../../../core/helpers/formatHttpError';
import { ToastrService } from 'ngx-toastr';
import { IProduct } from '../../interface/IPublishing';
import { Isale, PayloadService } from '../../services/payload.service';
import { SpinnerService } from '../../../../shared/services/spinner.service';
import { Iuser } from '../../../private/interface/Iuser';
import { BuyerService } from '../../../../shared/services/buyer.service';
@Component({
  selector: 'app-paycar',
  imports: [CommonModule, FormsModule, PaypalComponent, EfectivoComponent, StripeCheckoutComponent],
  templateUrl: './paycar.component.html',
  styleUrl: './paycar.component.scss'
})
export class PaycarComponent implements OnInit {
  productId: string = '';
  publishing?: IProduct
  selectedPaymentMethod: string = 'cash';
  currentPrice?: number
  idBuyer?: number
  constructor(
    private route: ActivatedRoute,
    private publishinService: PublishingService,
    private toast: ToastrService,
    private spinnerService: SpinnerService,
    private payloadService: PayloadService,
    private router: Router,
    private buyerService: BuyerService
  ) { }
  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id') || '';
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id') || '';
    });
    this.getproduct()

    this.spinnerService.show()
    try {
      const raw = localStorage.getItem('auth_data');
      const data = raw ? JSON.parse(raw) : null;
      if (data) {
        this.buyerService.getByIdUser(data.id).subscribe({
          next: (value) => {
            console.log(value);
            this.idBuyer = value[0].id
            this.spinnerService.hide()
          },
          error: (err) =>{
            console.log(err);
          }
        })
        
      }
      else {
        this.idBuyer = 0
        this.spinnerService.forceHide()
      }
    } catch {
      this.idBuyer = 0;
      this.spinnerService.forceHide()
    }
  }
  onPaymentMethodChange(method: string) {
    this.selectedPaymentMethod = method;
  }

  getproduct() {
    const id = Number(this.productId)
    this.publishinService.getById(id).subscribe({
      next: (response) => {
        this.publishing = response
        this.currentPrice = this.publishing.price
        console.log(this.currentPrice);
      },
      error: (err) => {
        const { message, errors } = formatHttpError(err)
        this.toast.error(errors, message)
      }
    })
  }

  onPayNow(data: any) {

    if (this.publishing?.id) {
      const raw = localStorage.getItem('auth_data');
      const data = raw ? JSON.parse(raw) : null;
      if (data) {

        const sale: Isale = {
          publishingId: this.publishing?.id,
          buyerId: this.idBuyer || 0,
          statusId: 1
        }

        console.log(sale);
        this.spinnerService.show()
        this.payloadService.createSale(sale).subscribe({
          next: () => {
            this.toast.success('Tu pago esta listo y siendo prosesado .....')
            this.spinnerService.hide()
            this.router.navigate(['inicio'])
          },
          error: (err) => {
            this.spinnerService.hide()
            const { message, errors } = formatHttpError(err.error)
            this.toast.error(errors, message)
          },
          complete: () => this.spinnerService.hide
        })
      }
      else {
        this.spinnerService.hide;
      }
    }
  }
}
