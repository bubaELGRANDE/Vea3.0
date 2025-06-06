import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IProduct } from '../../Ipublishing';
import { TruncatePipe } from "../../../../../../core/pipes/truncate.pipe";

@Component({
  selector: 'app-products-cards',
  imports: [TruncatePipe],
  templateUrl: './products-cards.component.html',
  styleUrl: './products-cards.component.scss'
})
export class ProductsCardsComponent implements OnInit {
  @Input() publishing?: IProduct
  @Output() onModal = new EventEmitter<IProduct>

  title: string
  price: number
  urlImg: any
  username:string = ''
  sellerName: string

  constructor() {
    this.title = this.publishing?.title || 'no found data'
    this.price = this.publishing?.price || 0.00
    this.sellerName = this.publishing?.seller.user.name || 'seller'
    this.urlImg = this.publishing?.images[1] || 'assets/img/default.jpg'
  }

  ngOnInit(): void {
    console.log(this.publishing);
    this.title = this.publishing?.title || 'no found data'
    this.price = this.publishing?.price || 0.00
    this.sellerName = this.publishing?.seller.user.name || 'seller'
    this.urlImg = this.publishing?.images[1] || 'assets/img/default.jpg'
  }

  opden(){
    this.onModal.emit(this.publishing)
  }
}
