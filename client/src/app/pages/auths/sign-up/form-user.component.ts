import { Component, EventEmitter, Output } from '@angular/core';
import { Iuser } from '../../../core/interface/Iuser';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../../core/services/alert.service';
import { TogglePasswordDirective } from '../../../shared/directives/toggle-password.directive';



@Component({
  selector: 'app-form-user',
  imports: [ReactiveFormsModule, TogglePasswordDirective],
  template: `
  <form [formGroup]="userForm" class="modal" data-aos="fade-up">
      <h1>Crea tu usuario</h1>
      <div class="content">
          <div class="between">
              <div class="input">
                  <span>Nombre</span>
                  <div class="text-box">
                      <i class="fa-solid fa-pen"></i>
                      <input formControlName="name" type="text" placeholder="nombres">
                  </div>
              </div>
              <div class="input">
                  <span>Apellidos</span>
                  <div class="text-box">
                      <i class="fa-solid fa-pen"></i>
                      <input formControlName="lastname" type="text" placeholder="Apellido">
                  </div>
              </div>
          </div>
          <div class="input">
              <span>nombre de usuario</span>
              <div class="text-box">
                  <i class="fa-solid fa-user"></i>
                  <input formControlName="username" type="text" placeholder="usuario">
              </div>
          </div>
          <div class="input">
              <span>Correo electronico</span>
              <div class="text-box">
                  <i class="fa-solid fa-envelope"></i>
                  <input formControlName="email" type="email" placeholder="Correo electrinico">
              </div>
          </div>
          <div class="between">
              <div class="input">
                  <span>Contraseña</span>
                  <div class="text-box">
                      <i class="fa-solid fa-lock"></i>
                      <input formControlName="password" type="password" placeholder="contraseña">
                      <a class="btn-password" appTogglePassword>
                          <i class="fa-solid fa-eye"></i>
                      </a>
                  </div>
              </div>
              <div class="input">
                  <span>Repertir Contraseña</span>
                  <div class="text-box">
                      <i class="fa-solid fa-lock"></i>
                      <input formControlName="repeatPassword" type="password" placeholder="contraseña">
                      <a class="btn-password" appTogglePassword>
                          <i class="fa-solid fa-eye"></i>
                      </a>
                  </div>
              </div>
          </div>
          <div class="msg">
              <span class="info">(*) campos requeridos. Contaseña mayor de 8 caracteres, mayúsculas, minúsculas, número y
                  símbolo.</span>
              @if (userForm.invalid && userForm.touched) {
              @for (error of formErrors; track error) {
              <span class="error">{{ error }}</span>
              }
              }
          </div>

      </div>
      <div class="form-buttons">
          <button class="btn btn-primary" (click)="onNext()">
              <div><i class="fa-solid fa-arrow-right"></i><span>Continuar</span></div>
          </button>
      </div>
  </form>
  `
})
export class FormUserComponent {

  @Output() userInfo = new EventEmitter<Iuser>();
  @Output() next = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();

  userForm: FormGroup;

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



  onNext() {
    this.userForm.markAllAsTouched();
    if (this.userForm.valid) {
      const formValues = this.userForm.value;

      const user: Iuser = {
        name: `${formValues.name} ${formValues.lastname}`,
        username: formValues.username,
        email: formValues.email,
        password: formValues.password,
        create_at: new Date(),
        update_at: new Date(),
      };

      this.userInfo.emit(user);
      this.next.emit();


    } else {

      this.logFormErrors(this.userForm);
    }
  }

  private logFormErrors(form: FormGroup, parentKey: string = ''): void {
    Object.keys(form.controls).forEach(controlName => {
      const control = form.get(controlName);
      const key = parentKey ? `${parentKey}.${controlName}` : controlName;

      if (control && control.invalid) {
        const errors = control.errors;
        this.alertService.error(`lorem ups`, `Formulario no completado`)
      }

      // Si es un FormGroup anidado
      if (control instanceof FormGroup) {
        this.logFormErrors(control, key);
      }
    });
  }


  onBack() {
    this.back.emit();
  }
}
