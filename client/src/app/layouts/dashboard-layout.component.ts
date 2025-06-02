import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../shared/components/navbar/navbar.component";
import { FooterComponent } from "../shared/components/footer/footer.component";
import { RouterModule } from '@angular/router';
import AOS from 'aos';


@Component({
  standalone: true,
  selector: 'app-dashboard-layout',
  imports: [NavbarComponent, FooterComponent, RouterModule],
  template: `
    <div class="container">
      <app-navbar></app-navbar>
      <router-outlet></router-outlet>
      <app-footer></app-footer>
    </div>`
})
export class DashboardLayoutComponent {
}
