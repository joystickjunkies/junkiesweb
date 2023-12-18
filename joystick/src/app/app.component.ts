import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone:true,
  imports:[CommonModule,RouterModule,RouterLink,RouterLinkActive,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'joystick';
}


