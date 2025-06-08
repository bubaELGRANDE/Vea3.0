import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertService } from '../../../../core/services/alert.service';
import { TogglePasswordDirective } from '../../../../shared/directives/toggle-password.directive';

@Component({
  selector: 'app-user-form-password',
  imports: [ReactiveFormsModule, TogglePasswordDirective],
  templateUrl: './user-form-password.component.html'
})
export class UserFormPasswordComponent {

  constructor(private fb: FormBuilder, private alertService: AlertService) {
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

  userForm: FormGroup;
  get formErrors(): string[] {
    const messages: string[] = [];
    const c = this.userForm.controls;
    if (c['password'].hasError('required')) messages.push('La contraseña es obligatoria.');
    if (c['password'].hasError('minlength')) messages.push('La contraseña debe tener al menos 8 caracteres.');
    if (c['password'].hasError('maxlength')) messages.push('La contraseña no puede superar los 100 caracteres.');
    if (c['password'].hasError('pattern')) messages.push('La contraseña debe contener al menos: una mayúscula, una minúscula, un número y un carácter especial.');

    if (c['repeatPassword'].hasError('required')) messages.push('Debes repetir la contraseña.');
    if (c['repeatPassword'].hasError('mismatch')) messages.push('Las contraseñas no coinciden.');

    return messages;
  }
}
