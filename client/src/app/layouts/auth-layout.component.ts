import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterModule],
  template: `
    <div class="full">
      <nav>
          <a [routerLink]="'/inicio'">
              <h1>Vea</h1>
          </a>
      </nav>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: `
    @use "../../assets/styles/base/variables" as *;
    @use "../../assets/styles/base/mixins" as *;
    .full {@include flex(column,flex-start, center); row-gap:$mb-1; width:100%; height:100%; min-height:100vh; padding-bottom: $mb-2;}
    nav {
        @include flex(row, center, center);
        width: 100%;
        height: 10vh;
        background-color: $black;
        h1 {
            font-size: $big-font-size;
            color: $white-100;
        }
    }
  `
})
export class AuthLayoutComponent {

}
