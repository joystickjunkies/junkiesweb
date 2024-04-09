import { Component,Inject,PLATFORM_ID, HostListener} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { NavigationEnd,Router,RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ CommonModule , RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass'
})
export class HomeComponent {
  mostrarBoton = false;
  routerSubscription: Subscription;

  constructor(public router: Router,@Inject(PLATFORM_ID) private platformId: Object){
      // Suscripción a eventos de cambio de ruta
      this.routerSubscription = this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          // Llamada a la función de verificación al cambiar de ruta
          this.checkScrollPosition();
        }
      });
  }

  ngOnInit() {
    this.checkScrollPosition();
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkScrollPosition();
  }

  private checkScrollPosition() {

    if (isPlatformBrowser(this.platformId)) 
    {
      const posicionY = window.pageYOffset || document.documentElement.scrollTop;
      const altura = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const anchoPantalla = window.innerWidth;
  
  
      if (posicionY > altura - 230 && anchoPantalla <= 1274 && this.router.url === '/chipeo') {
        this.mostrarBoton = true;
      } else {
          if(anchoPantalla  > 1274) {
            this.mostrarBoton = true;
          }
          else{
            this.mostrarBoton = false;
          }
      } 
    }
  }

}