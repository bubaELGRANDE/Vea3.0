import { Injectable } from '@angular/core';
import { IProduct } from '../interface/IPublishing'; // Ajusta el path según tu estructura

const WISHLIST_KEY = 'wishlist';

@Injectable({
  providedIn: 'root'
})
export class WishtlistService {
  constructor() { }

  getWishlist(): IProduct[] {
    const data = localStorage.getItem(WISHLIST_KEY);
    return data ? JSON.parse(data) : [];
  }

  addToWishlist(product: IProduct): void {
    const current = this.getWishlist();
    const exists = current.some(p => p.id === product.id);
    if (!exists) {
      current.push(product);
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(current));
    }
  }

  removeFromWishlist(productId: number): void {
    const current = this.getWishlist().filter(p => p.id !== productId);
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(current));
  }

  isInWishlist(productId: number): boolean {
    return this.getWishlist().some(p => p.id === productId);
  }

  clearWishlist(): void {
    localStorage.removeItem(WISHLIST_KEY);
  }
}
