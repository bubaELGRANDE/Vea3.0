import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RoleSelectorComponent } from './role-selector.component';
import { ImgSelectorComponent } from "./img-selector.component";
import { TermsComponent } from "../../../shared/components/terms/terms.component";
import { Router } from '@angular/router';
import { Iuser } from '../../../core/interface/Iuser';
import { FormUserComponent } from "./form-user.component";
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { formatHttpError } from '../../../core/helpers/formatHttpError';
import { BuyerService } from '../../../shared/services/buyer.service';
import { Ibuyer } from '../../../core/interface/IIbuyer';
import { AlertService } from '../../../core/services/alert.service';
import { ImgService } from '../../../shared/services/img.service';

interface ISellerS {
  id?: number;
  phone: string;
  userId: number;
}
@Component({
  selector: 'app-sign-up',
  imports: [
    CommonModule,
    RoleSelectorComponent,
    ImgSelectorComponent,
    TermsComponent,
    FormUserComponent
  ],
  templateUrl: './sign-up.component.html',
  styles: `
    @use "../../../../assets/styles/base/variables" as *;
    @use "../../../../assets/styles/base/mixins" as *;
  .steps {
      position: relative;
      padding: $mb-1;
      @include flex(row, center, center);
      gap: $mb-1-5;

      .step {
          @include flex(column, center, center);background-color: $gray;width: 50px;height: 50px;border-radius: 50%;color: $white-80;
          &.active {background-color: $yellow;color: $browm;}
      }
  }
  .modal {
      padding: $mb-2;
      width: 100%;
      max-width: 500px;
      height: auto;
      margin-bottom: $mb-0-5;
      gap: $mb-0-5;
  }
  .text {@include flex(column, center, center);p {color: $black;}a {outline: none;color: $gray;}}
  `
})



export class SignUpComponent {

  currentFile: File[] = [];
  currentRol: 'comprador' | 'vendedor' | null = null
  currentUser?: Iuser;

  currentForm: number = 0;
  maxForm = 4;

  currentPhone: number = 0;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private buyerService: BuyerService,
    private alertService: AlertService,
    private router: Router,
    private imgService: ImgService
  ) { }

  saveRol(rol: 'comprador' | 'vendedor') {
    this.currentRol = rol
    if (this.currentRol) {
      this.currentUser?.roles?.push(this.currentRol)
    }
  }
  saveImage(files: File[]) {
    this.currentFile = files;
    if (this.currentUser) {
      this.currentUser.img = this.currentFile[0].name;
    }
  }
  saveUser(user: Iuser) {
    this.currentUser = user;
  }

  onPhone(event: any) {
    this.currentPhone = event
  }

  onNext() {
    if (this.currentForm < this.maxForm) {
      this.currentForm = this.currentForm + 1;
    }
  }
  onBack() {
    if (this.currentForm > 0) {
      this.currentForm = this.currentForm - 1;
    }
  }

  onSave(): void {
    if (this.currentFile != null && this.currentUser != null && this.currentRol != null) {
      console.log(this.currentFile[0]);
      this.imgService.saveOne(this.currentFile[0]).subscribe({
        next: (res) => {
          this.toastr.success('Imagen guardada.')
        }, error: (err) => {
          const { message, errors } = formatHttpError(err);
          this.toastr.error(errors, message)
          console.log(err);
        },
        complete: () => {
          if (this.currentUser) {
            this.authService.register(this.currentUser).subscribe({
              next: (response) => {
                if (response.success) {
                  let userResponse: Iuser = response.data.user;
                  if (this.currentRol = 'comprador') {
                    let buyer: Ibuyer = {
                      phone: this.currentPhone.toString(),
                      userId: userResponse.id || 0
                    }
                    this.buyerService.register(buyer).subscribe({
                      next: (response) => {
                        if (response.success) {
                          this.alertService.success('Usuario creado exitosamente.')
                          this.router.navigate(['auth/login'])
                        }
                        else {

                          //? Error especial (success == False)
                          const { message, errors } = formatHttpError(response.error);
                          this.toastr.error(errors, message)
                        }
                      },
                      error: (err) => {
                        const { message, errors } = formatHttpError(err);
                        this.toastr.error(errors, message)
                        //
                      }
                    })
                  }
                  else {
                    let seller: ISellerS = {
                      phone: this.currentPhone.toString(),
                      userId: userResponse.id || 0
                    }
                    this.buyerService.registerSeller(seller).subscribe({
                      next: (response) => {
                        if (response.success) {
                          this.alertService.success('Usuario creado exitosamente.')
                          this.router.navigate(['auth/login'])
                        }
                        else {

                          //? Error especial (success == False)
                          const { message, errors } = formatHttpError(response.error);
                          this.toastr.error(errors, message)
                        }
                      },
                      error: (err) => {
                        const { message, errors } = formatHttpError(err);
                        this.toastr.error(errors, message)
                        //
                      }
                    })
                  }
                }
                else {
                  //? Error especial (success == False)
                  const { message, errors } = formatHttpError(response);
                  this.toastr.error(errors, message)
                }

              },
              error: (err) => {
                const { message, errors } = formatHttpError(err);
                this.toastr.error(errors, message)
              },
            })
          }
        }
      })
    }
  }
}
