import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from "../pages/private/sidebar/sidebar.component";


@Component({
  standalone: true,
  selector: 'app-dashboard-layout',
  imports: [RouterModule, SidebarComponent],
  template: `
      <div class="app-container">
        <app-sidebar></app-sidebar>
        <div class=" content">
            <router-outlet></router-outlet>
        </div>
      </div>`,
  styles: `
  .app-container {
    display: flex;
    height: 100vh;
  }
  .content {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  .cards-container::-webkit-scrollbar {
    display: none;
  }`
})
export class DashboardLayoutComponent {
}
