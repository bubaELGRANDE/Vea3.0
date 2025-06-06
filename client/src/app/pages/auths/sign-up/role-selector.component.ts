import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
@Component({
  selector: 'app-role-selector',
  imports: [CommonModule],
  template: `
  <h1>¿Qué rol quiere tener?</h1>
  <div class="content">
    <div class="between">
      <a
        class="btn type"
        [ngClass]="selectedRole === 'comprador' ? 'btn-primary' : 'btn-black'"
        (click)="selectRole('comprador')"
      >
        <div>
          <i class="fa-solid fa-bag-shopping"></i>
          <span>Comprar</span>
        </div>
      </a>
      <a
        class="btn type"
        [ngClass]="selectedRole === 'vendedor' ? 'btn-primary' : 'btn-black'"
        (click)="selectRole('vendedor')"
      >
        <div>
          <i class="fa-solid fa-shop"></i>
          <span>Vender</span>
        </div>
      </a>
    </div>
  </div>
  <div class="form-buttons">
    <a class="btn btn-secundary" (click)="onBack()">
      <div><i class="fa-solid fa-arrow-left"></i><span>Regresar</span></div>
    </a>
    <a class="btn btn-primary" (click)="onNext()" [class.disabled]="!selectedRole">
      <div><span>Registrarme</span><i class="fa-solid fa-arrow-right"></i></div>
    </a>
  </div>
  `,
  styles: `
   @use "../../../../assets/styles/base/variables" as *;
  .type {
        height: 150px;
        div {
            flex-direction: column;
            align-items: center;
            svg {
                font-size: $big-font-size;
            }
            span {
                font-size: $h1-font-size;
                font-weight: $font-regular;
            }
        }
    }
  `
})
export class RoleSelectorComponent {
  selectedRole: 'comprador' | 'vendedor' | null = null;
  @Output() roleSelected = new EventEmitter<'comprador' | 'vendedor'>();
  @Output() next = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();
  selectRole(role: 'comprador' | 'vendedor') {
    this.selectedRole = role;
    this.roleSelected.emit(role);
  }
  onNext() {
    if (this.selectedRole) {
      this.next.emit();
    }
  }
  onBack() {
    this.back.emit();
  }
}
