import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UserMenuComponent } from "../user-menu/user-menu.component";
import { addLocalStorageUser, clearAllStorage } from '../../../core/helpers/localStorage';
import { SpinnerService } from '../../services/spinner.service';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { formatHttpError } from '../../../core/helpers/formatHttpError';

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
  userInfo: any = null;

  isScrolled = false;

  constructor(private userService: UserService, private toast: ToastrService, private spinnerService: SpinnerService) {
    this.loadUserInfo()
  }

  loadUserInfo() {
    try {
      const raw = localStorage.getItem('auth_data');
      const data = raw ? JSON.parse(raw) : null;
      if (data) {

        this.userService.getById(data.id).subscribe({
          next: (response) => {
            addLocalStorageUser(response.data)
            this.userInfo = response.data
          },
          error: (err) => {
            const { message, errors } = formatHttpError(err)
            this.toast.error(errors, message)
            this.userInfo = {
              id: data.id,
              name: data.name,
              avatar: data.img || 'assets/img/user/user.jpg',
              role: data.roles?.[0] || 'Usuario'
            };

          }
        })
      }
      else {
        this.userInfo = null
      }
    } catch {
      this.userInfo = null;
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 0;
  }

  logout() {
    this.spinnerService.show()
    clearAllStorage();
    this.spinnerService.hide()
    window.location.reload();
  }
}
