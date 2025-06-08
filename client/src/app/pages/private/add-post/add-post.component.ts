import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

// Servicios que usará el componente
import { PublishingService } from '../../../core/services/publishing.service';
import { CatalogosService } from '../../../core/services/catalogo.service';

// Interfaces y DTOs necesarios
import { IArticleStatus } from '../../../core/interface/IArticleStatus';
import { ICategory } from '../../../core/interface/ICategory';
import { CreatePublishingDto } from '../../../core/dto/publishing.dto';

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  postForm: FormGroup;

  categories$: Observable<ICategory[]>;
  articleStatusList$: Observable<IArticleStatus[]>;

  isSubmitting: boolean = false;
  submissionError: string | null = null;
  submissionSuccess: boolean = false;

  constructor(
    private fb: FormBuilder,
    private publishingService: PublishingService,
    private catalogosService: CatalogosService,
    private router: Router
  ) {
    this.categories$ = this.catalogosService.getCategories();
    this.articleStatusList$ = this.catalogosService.getArticleStatus();

    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      price: [null, [Validators.required, Validators.min(0.01)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      categoryId: [null, Validators.required],
      articleStatusId: [null, Validators.required],
      sku: ['']
    });
  }

  ngOnInit(): void {}

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      console.log('Imágenes seleccionadas:', input.files);
      // Aquí puedes manejar la carga de imágenes si quieres
    }
  }

  onSubmit(): void {
    if (this.postForm.invalid) {
      this.postForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.submissionError = null;
    this.submissionSuccess = false;

    const formValue = this.postForm.value;

    const newPublication: CreatePublishingDto = {
      title: formValue.title,
      description: formValue.description,
      price: formValue.price,
      articleStatusId: Number(formValue.articleStatusId),
      categoryIds: [Number(formValue.categoryId)],
      sku: formValue.sku || undefined
    };

    this.publishingService.createPublication(newPublication).subscribe({
      next: (response) => {
        console.log('Publicación creada con éxito:', response);
        this.submissionSuccess = true;
        this.isSubmitting = false;
        this.postForm.reset();

        setTimeout(() => {
          this.router.navigate(['/private/post-list']);
        }, 2000);
      },
      error: (err) => {
        console.error('Error al crear la publicación:', err);
        this.submissionError = 'Ocurrió un error al guardar. Por favor, revisa los datos e inténtalo de nuevo.';
        this.isSubmitting = false;
      }
    });
  }

  get f() { return this.postForm.controls; }
}
