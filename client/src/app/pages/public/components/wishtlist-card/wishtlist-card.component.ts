import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IProduct } from '../../interface/IPublishing';
import { TruncatePipe } from "../../../../core/pipes/truncate.pipe";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wishtlist-card',
  imports: [CommonModule,TruncatePipe],
  templateUrl: './wishtlist-card.component.html',
  styleUrl: './wishtlist-card.component.scss'
})
export class WishtlistCardComponent implements OnInit {
  @Input() publishing?: IProduct
  @Output() remove = new EventEmitter<number>;

  title: string
  price: number
  urlImg: any
  username: string = ''
  sellerName: string = ''
  imgname: string = ''


  constructor() {
    this.title = this.publishing?.title || 'no found data'
    this.price = this.publishing?.price || 0.00
    this.sellerName = this.publishing?.seller.user.name || 'seller'
    if (this.publishing?.images != undefined) {
      if (this.publishing?.images.length > 0) {
        this.urlImg = this.publishing?.images[0] || 'assets/img/default.jpg'
        this.imgname = this.publishing?.images[0].url || 'images'
      }
      else {
        this.urlImg = 'assets/img/default.jpg'
        this.imgname = 'images'
      }

    }
    else {
      this.urlImg = 'assets/img/default.jpg'
      this.imgname = 'images'
    }
  }

  ngOnInit(): void {
    this.title = this.publishing?.title || 'no found data'
    this.price = this.publishing?.price || 0.00
    this.sellerName = this.publishing?.seller.user.name || 'seller'
    if (this.publishing?.images != undefined) {
      if (this.publishing?.images.length > 0) {
        this.urlImg = this.publishing?.images[0] || 'assets/img/default.jpg'
        this.imgname = this.publishing?.images[0].url || 'images'
      }
      else {
        this.urlImg = 'assets/img/default.jpg'
        this.imgname = 'images'
      }

    }
    else {
      this.urlImg = 'assets/img/default.jpg'
      this.imgname = 'images'
    }
  }

  onRemove() {
    this.remove.emit(this.publishing?.id)
  }

  onImgError(event: Event) {
    const element = event.target as HTMLImageElement;
    element.src = 'assets/img/default.jpg';
  }
}
