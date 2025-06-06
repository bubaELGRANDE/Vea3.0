import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerComponent } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NgxSpinnerComponent],
  template: `
  <ngx-spinner bdColor = "rgba(26,26,26,0.90)" size = "medium" color = "#f2f2f7" type = "square-loader" [fullScreen] = "true"><p style="color: white" > Un momento, procesando... </p></ngx-spinner>
  <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  title = 'client';
}