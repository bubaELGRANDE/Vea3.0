import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-terms',
  imports: [CommonModule],
  templateUrl: './terms.component.html',
  styles: `.texto{text-align: center;}`
})
export class TermsComponent {

  @Input() role: 'comprador' | 'vendedor' | null = null;
  termsAccepted = false;

  @Output() next = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();

  onAcceptChange(checked: boolean) {
    this.termsAccepted = checked;
  }

  onNext() {
    if (this.termsAccepted) {
      this.next.emit();
    }
  }

  onBack() {
    this.back.emit();
  }

}
