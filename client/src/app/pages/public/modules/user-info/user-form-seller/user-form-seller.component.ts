import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Iuser } from '../../../../../core/interface/Iuser';
import { AlertService } from '../../../../../core/services/alert.service';

@Component({
  selector: 'app-user-form-seller',
  imports: [CommonModule,RouterModule],
  templateUrl: './user-form-seller.component.html'
})
export class UserFormSellerComponent {
  userInfo?: Iuser
  userForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private alertService: AlertService) {
    this.userForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.pattern(/^(?!\s*$).+/)
      ]],
      lastname: [''], // No es requerido
      username: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern(/^[a-zA-Z0-9_]+$/)
      ]],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.maxLength(100)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(100),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.@$!%*?&_,;\-])/)
      ]],
      repeatPassword: ['', Validators.required],
    }, {
      validators: this.passwordMatchValidator
    });

  }

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
    try {
      const raw = localStorage.getItem('auth_data');
      const data = raw ? JSON.parse(raw) : null;
      if (data) {
        this.userInfo = data
        console.log(this.userInfo);
      }
    } catch (error) {
      this.alertService.error('No ha iniciado sesión')
      this.router.navigate(['auth/login'])
    }
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const repeatPassword = form.get('repeatPassword')?.value;

    if (password !== repeatPassword) {
      form.get('repeatPassword')?.setErrors({ mismatch: true });
    } else {
      form.get('repeatPassword')?.setErrors(null);
    }
    return null;
  }

  get formErrors(): string[] {
    const messages: string[] = [];
    const c = this.userForm.controls;

    if (c['name'].hasError('required')) messages.push('El nombre es obligatorio.');
    if (c['name'].hasError('minlength')) messages.push('El nombre debe tener al menos 2 caracteres.');
    if (c['name'].hasError('maxlength')) messages.push('El nombre no puede superar los 50 caracteres.');
    if (c['name'].hasError('pattern')) messages.push('El nombre debe ser una cadena de texto válida.');

    if (c['username'].hasError('required')) messages.push('El nombre de usuario es obligatorio.');
    if (c['username'].hasError('minlength')) messages.push('El nombre de usuario debe tener al menos 3 caracteres.');
    if (c['username'].hasError('maxlength')) messages.push('El nombre de usuario no puede superar los 30 caracteres.');
    if (c['username'].hasError('pattern')) messages.push('El nombre de usuario solo puede contener letras, números y guiones bajos.');

    if (c['email'].hasError('required')) messages.push('El correo es obligatorio.');
    if (c['email'].hasError('email')) messages.push('Debe proporcionar un email válido.');
    if (c['email'].hasError('maxlength')) messages.push('El email no puede superar los 100 caracteres.');

    if (c['password'].hasError('required')) messages.push('La contraseña es obligatoria.');
    if (c['password'].hasError('minlength')) messages.push('La contraseña debe tener al menos 8 caracteres.');
    if (c['password'].hasError('maxlength')) messages.push('La contraseña no puede superar los 100 caracteres.');
    if (c['password'].hasError('pattern')) messages.push('La contraseña debe contener al menos: una mayúscula, una minúscula, un número y un carácter especial.');

    if (c['repeatPassword'].hasError('required')) messages.push('Debes repetir la contraseña.');
    if (c['repeatPassword'].hasError('mismatch')) messages.push('Las contraseñas no coinciden.');

    return messages;
  }
}
