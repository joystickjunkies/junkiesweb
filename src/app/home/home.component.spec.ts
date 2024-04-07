import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from './home.component';
import { Router, Routes } from '@angular/router';
import { NavigationEnd } from '@angular/router';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>; 
  let router: Router;

 /*  const mockRouter: Routes = [
    { path: '', redirectTo: 'chipeo', pathMatch: 'full' },
    { path: 'chipeo', component: HomeComponent }, // Asumiendo que quieres probar la redirección aquí.
    // Agrega otras rutas según sea necesario para tus pruebas
  ];
 */
  beforeEach(async () => {
        // Crea un mock para el Router

    
    await TestBed.configureTestingModule({
      imports: [HomeComponent, RouterTestingModule.withRoutes([
        { path: '', redirectTo: 'chipeo', pathMatch: 'full' },
        { path: 'chipeo', component: HomeComponent }, // Define tus rutas de prueba aquí
      ])]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);

    // Simula eventos del router como Observables
    spyOnProperty(router, 'events').and.returnValue(of(new NavigationEnd(0, '/chipeo', '/chipeo')));


    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Pruebas adicionales aquí
  it('should show the button under specific conditions', async () => {
    // Configura las condiciones iniciales de tu prueba aquí
    // Por ejemplo, navega a '/chipeo' y ajusta el tamaño de la ventana y la posición del scroll si es necesario

    // Navegación simulada a 'chipeo'
    await router.navigate(['chipeo']);
    fixture.detectChanges();

    // Ajusta las expectativas de tu prueba, por ejemplo:
    const button = fixture.debugElement.query(By.css('button'));
    expect(button).toBeDefined(); // Asegúrate de que el botón esté presente bajo las condiciones esperadas
  });



});
