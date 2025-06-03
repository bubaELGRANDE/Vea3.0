import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-post',
  imports: [],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.css'
})
export class AddPostComponent {

    mostrarAlerta() {
    Swal.fire({
      text: ' Publicación Añadida',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });
  }

}
