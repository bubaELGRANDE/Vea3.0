import { Component, EventEmitter, Input, input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertService } from '../../../../../core/services/alert.service';
import { Iuser } from '../../../../../core/interface/Iuser';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../../../shared/services/user.service';
import { formatHttpError } from '../../../../../core/helpers/formatHttpError';

@Component({
  selector: 'app-user-form-data',
  imports: [ReactiveFormsModule],
  templateUrl: './user-form-data.component.html'
})
export class UserFormDataComponent implements OnInit {

  @Input() userInfo?: Iuser;
  @Output() reload: EventEmitter<any> = new EventEmitter
  userForm: FormGroup;
  isEditing: boolean = false;
  private originalData: any;

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private toast: ToastrService,
    private userService: UserService
  ) {
    this.userForm = this.fb.group({
      name: [{ value: '', disabled: true }, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.pattern(/^(?!\s*$).+/)
      ]],
      username: [{ value: '', disabled: true }, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern(/^[a-zA-Z0-9_]+$/)
      ]],
      email: [{ value: '', disabled: true }, [
        Validators.required,
        Validators.email,
        Validators.maxLength(100)
      ]]
    });
  }

  ngOnInit(): void {
    if (this.userInfo) {
      this.userForm.patchValue({
        name: this.userInfo.name,
        username: this.userInfo.username,
        email: this.userInfo.email
      });
      this.originalData = { ...this.userInfo };
    }
  }

  enableEditing(): void {
    this.isEditing = true;
    this.userForm.enable();
  }

  cancelEdit(): void {
    this.userForm.patchValue(this.originalData);
    this.userForm.markAsPristine();
    this.userForm.markAsUntouched();
    this.userForm.disable();
    this.isEditing = false;
  }


  saveChanges(): void {
    if (this.userForm.invalid && !this.userInfo) {
      this.userForm.markAllAsTouched();
      this.toast.warning('Por favor completa todos los campos del formulario', 'Datos incompletos')
    }

    const updatedUser = this.userForm.value;
    if (this.userInfo?.id) {
      this.userService.update(updatedUser, this.userInfo.id).subscribe({
        next: (response) => {
          this.toast.success(response.message, 'Datos modificados');
          this.reload.emit()
        },
        error: (error) => {
          console.log(error);
          const { message, errors } = formatHttpError(error)
          this.toast.error(errors, message);
        }
      })
    }

    this.userForm.disable();
    this.isEditing = false;
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

    return messages;
  }
}
