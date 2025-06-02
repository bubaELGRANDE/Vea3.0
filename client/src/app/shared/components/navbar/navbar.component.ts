import { Component, HostListener } from '@angular/core';
import { Iuser } from '../../../core/interface/Iuser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserMenuComponent } from "../user-menu/user-menu.component";

@Component({
  standalone: true,
  selector: 'app-navbar',
  imports: [
    CommonModule,
    RouterModule,
    UserMenuComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  /*userInfo = {
    name: 'My name',
    id: 10020,
    avatar: 'assets/img/user/user.jpg',
    role: 'Administrador'
  };*/

  userInfo:any = null

  handleLogout() {
    // lógica para cerrar sesión
  }

  isScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 0;
  }
}
