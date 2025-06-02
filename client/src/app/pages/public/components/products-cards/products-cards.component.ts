import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ipublishing } from '../../interfaces/Ipublishing';
import { TruncatePipe } from "../../../../core/pipes/truncate.pipe";

@Component({
  selector: 'app-products-cards',
  imports: [TruncatePipe],
  templateUrl: './products-cards.component.html',
  styleUrl: './products-cards.component.scss'
})
export class ProductsCardsComponent implements OnInit {
  @Input() publishing?: Ipublishing
  @Output() onModal = new EventEmitter<Ipublishing>
  title: string
  article: string
  price: number
  urlImg: string = '../../../../../assets/img/'
  sellerLastName: string
  sellerName: string

  constructor() {
    this.title = this.publishing?.title || 'no found data'
    this.article = this.publishing?.article || 'article'
    this.price = this.publishing?.price || 0.00
    this.sellerName = this.publishing?.seller.user.name || 'seller'
    this.sellerLastName = this.publishing?.seller.user.lastname || 'not found'
    this.urlImg = this.publishing?.img || 'assets/img/default.jpg'
  }

  ngOnInit(): void {
    this.title = this.publishing?.title || 'no found data'
    this.article = this.publishing?.article || 'article'
    this.price = this.publishing?.price || 0.00
    this.sellerName = this.publishing?.seller.user.name || 'seller'
    this.sellerLastName = this.publishing?.seller.user.lastname || 'not found'
    this.urlImg = this.publishing?.img || 'assets/img/default.jpg'
  }

  opden(){
    this.onModal.emit(this.publishing)
  }
}
