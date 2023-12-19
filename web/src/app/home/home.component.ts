import { Component } from '@angular/core';
import { Router,RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass'
})
export class HomeComponent {
  constructor(private router:Router) {}

  navegarReserva() {
    this.router.navigate(['/reserva'])
  }

}
