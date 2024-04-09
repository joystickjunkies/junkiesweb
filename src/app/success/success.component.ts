import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './success.component.html',
  styleUrl: './success.component.sass'
})
export class SuccessComponent {
  @Input() mensaje:string = "";
}
