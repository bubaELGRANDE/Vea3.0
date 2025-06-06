import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[appTogglePassword]'
})

export class TogglePasswordDirective {
    private _shown = false;

    constructor(private el: ElementRef) { }

    @HostListener('click')
    toggle() {
        const input: HTMLInputElement | null = this.el.nativeElement.previousElementSibling;
        if (input && input.type === 'password') {
            input.type = 'text';
        } else if (input) {
            input.type = 'password';
        }
        this._shown = !this._shown;
        this.updateIcon();
    }

    private updateIcon() {
        const icon = this.el.nativeElement.querySelector('svg');
        if (icon) {
            icon.classList.toggle('fa-eye-slash', this._shown);
            icon.classList.toggle('fa-eye', !this._shown);
        }
    }
}

