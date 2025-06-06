// src/app/services/alert.service.ts
import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon, SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private defaultOptions = {
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Aceptar',
    cancelButtonText: 'Cancelar',
  };

  success(message: string, title = 'Éxito') {
    return Swal.fire({
      icon: 'success',
      title,
      text: message,
      ...this.defaultOptions,
    });
  }

  error(message: string, title = 'Error') {
    return Swal.fire({
      icon: 'error',
      title,
      text: message,
      ...this.defaultOptions,
    });
  }

  warning(message: string, title = 'Advertencia') {
    return Swal.fire({
      icon: 'warning',
      title,
      text: message,
      ...this.defaultOptions,
    });
  }

  info(message: string, title = 'Información') {
    return Swal.fire({
      icon: 'info',
      title,
      text: message,
      ...this.defaultOptions,
    });
  }

  question(message: string, title = '¿Estás seguro?'): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      icon: 'question',
      title,
      text: message,
      showCancelButton: true,
      ...this.defaultOptions,
    });
  }

  loading(title = 'Cargando...') {
    Swal.fire({
      title,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  }

  close() {
    Swal.close();
  }
}
