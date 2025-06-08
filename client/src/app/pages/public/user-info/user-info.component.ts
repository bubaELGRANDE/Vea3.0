import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../../core/services/alert.service';
import { Iuser } from '../../../core/interface/Iuser';
import { Router, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { UserFormSellerComponent } from './user-form-seller/user-form-seller.component';
import { UserFormDataComponent } from "./user-form-data/user-form-data.component";
import { UserFormPasswordComponent } from "./user-form-password/user-form-password.component";
import { UserFormImgComponent } from "./user-form-img/user-form-img.component";
import { addLocalStorageUser } from '../../../core/helpers/localStorage';
import { formatHttpError } from '../../../core/helpers/formatHttpError';
import { UserService } from '../../../shared/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from '../../../shared/services/spinner.service';

@Component({
  selector: 'app-user-info',
  imports: [CommonModule, RouterModule, UserFormSellerComponent, UserFormDataComponent, UserFormPasswordComponent, UserFormImgComponent],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss',
})
export class UserInfoComponent implements OnInit {
  userInfo?: Iuser

  constructor(
    private router: Router,
    private alertService: AlertService,
    private userService: UserService,
    private toast: ToastrService,
    private spinnerService: SpinnerService) { }

  ngOnInit(): void {
    this.loadUserInfo()
  }

  hasSeller(): boolean {
    if (this.userInfo?.roles) {
      return this.userInfo?.roles.includes('seller') ?? false;
    }
    else {
      return false;
    }
  }

  loadUserInfo() {
    this.spinnerService.show()
    try {
      const raw = localStorage.getItem('auth_data');
      const data = raw ? JSON.parse(raw) : null;
      if (data) {
        this.userInfo = data
        this.userService.getById(data.id).subscribe({
          next: (response) => {
            addLocalStorageUser(response.data)
            this.userInfo = response.data
          },
          error: (err) => {
            const { message, errors } = formatHttpError(err)
            this.toast.error(errors, message)
            this.userInfo = data;
            this.spinnerService.forceHide()
          },
          complete: () => this.spinnerService.hide()
        })
      }
      else {
        this.userInfo = undefined
        this.spinnerService.forceHide()
      }
    } catch {
      this.userInfo = undefined;
      this.spinnerService.forceHide()
    }
  }
}
