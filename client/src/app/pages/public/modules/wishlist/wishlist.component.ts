import { Component, OnInit } from '@angular/core';
import { WishtlistService } from '../../services/wishtlist.service';
import { ToastrService } from 'ngx-toastr';
import { IProduct } from '../../interface/IPublishing';
import { CurrencyPipe } from '@angular/common';
import { WishtlistCardComponent } from "../../components/wishtlist-card/wishtlist-card.component";
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-wishlist',
  imports: [CurrencyPipe, WishtlistCardComponent,RouterModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {
  list: IProduct[] = []
  totalPrice: number = 0
  constructor(private wishlistService: WishtlistService, private toastr: ToastrService) {
  }
  ngOnInit(): void {
    this.list = this.wishlistService.getWishlist()
    this.totalPrice = this.getTotalPrice()
  }
  getTotalPrice(): number {
    let total: number = 0
    this.list.forEach((item) => {
      const price = this.sanitizePrice(item.price);
      total = total + price;
    });
    return total
  }
  sanitizePrice(value: any): number {
    const parsed = parseFloat(String(value).replace(/[^\d.]/g, ''));
    return isNaN(parsed) ? 0 : parsed;
  }
  onRemove(event: any) {
    this.wishlistService.removeFromWishlist(event)
    this.toastr.warning('Publicación eliminada a favoritos')
    this.list = this.wishlistService.getWishlist()
  }
}
