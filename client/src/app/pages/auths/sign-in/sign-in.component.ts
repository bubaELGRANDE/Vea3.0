import { Component } from '@angular/core';
import { Route, Router, RouterModule } from '@angular/router';
import { TogglePasswordDirective } from '../../../shared/directives/toggle-password.directive';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { formatHttpError } from '../../../core/helpers/formatHttpError';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../../core/services/alert.service';
import { addLocalStorageToken, addLocalStorageUser } from '../../../core/helpers/localStorage';
import { Token } from '@angular/compiler';
import { SpinnerService } from '../../../shared/services/spinner.service';
@Component({
  selector: 'app-sign-in',
  imports: [CommonModule, ReactiveFormsModule, TogglePasswordDirective],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private alertService: AlertService,
    private router: Router,
    private spinnerService: SpinnerService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required
      ]],
      password: ['', [
        Validators.required,
      ]],
    });
  }
  get formErrors(): string[] {
    const messages: string[] = [];
    const c = this.loginForm.controls;
    if (c['email'].hasError('required')) messages.push('El nombre de usuario es obligatorio.');
    if (c['password'].hasError('required')) messages.push('La contraseña es obligatoria.');
    return messages;
  }
  login() {
    this.spinnerService.show();
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          if (response.success) {
            console.log(response);
            this.loginSuccessHandler(response.data);
            this.alertService.success(response.data.messages)
            this.router.navigate(['inicio'])
          }
        },
        error: (err) => {
          this.spinnerService.forceHide()
          const { message, errors } = formatHttpError(err);
          this.toastr.warning(errors, message)
        },
        complete: () => this.spinnerService.hide()
      })
    }
    else {
      this.toastr.warning('Formulario incompleto')
    }
  }
  loginSuccessHandler(response: any): void {
    const user = response.user;
    const tokens = response.tokens;
    addLocalStorageUser(user);
    addLocalStorageToken(tokens);
  }
}
