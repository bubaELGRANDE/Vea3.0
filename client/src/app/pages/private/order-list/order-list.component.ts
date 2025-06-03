import { Component, Input } from '@angular/core'; // Add Input to the imports
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent {
}
