import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-user-menu',
  imports: [CommonModule,RouterModule],
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.scss'
})
export class UserMenuComponent {
  @Input() user!: any;
  @Output() logout = new EventEmitter<void>();

  urlImg:string;

  constructor(){
    this.urlImg = environment.URL_IMG
  }

  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
