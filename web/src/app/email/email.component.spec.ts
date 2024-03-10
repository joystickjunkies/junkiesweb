import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EmailComponent } from './email.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { EmailserviceService } from '../emailservice.service';

describe('EmailComponent', () => {
  let component: EmailComponent;
  let fixture: ComponentFixture<EmailComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        EmailComponent,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        MatInputModule,
        MatSelectModule,
        NoopAnimationsModule,
        CommonModule
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);

    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya solicitudes pendientes
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not call sendEmail if form is invalid', fakeAsync(() => {
    component.modchipForm.setValue({
      name: '',
      email: 'not-an-email',
      phone: '',
      switchModel: '',
      menssage: ''
    });
    expect(component.modchipForm.valid).toBeFalse();
    component.onSubmit();
    tick(); // Asegurarse de avanzar en el tiempo para operaciones asíncronas
    // No se espera ninguna llamada a httpMock.expectOne porque el formulario es inválido.
  }));

  it('should call sendEmail and handle success if form is valid', fakeAsync(() => {
    component.modchipForm.setValue({
      name: 'Test Name',
      email: 'test@example.com',
      phone: '1234567890',
      switchModel: 'normal',
      menssage: 'Hello, this is a test message'
    });

    expect(component.modchipForm.valid).toBeTrue();
    component.onSubmit();

    tick(); // Asegurarse de avanzar en el tiempo para que se complete la llamada HTTP

    const req = httpMock.expectOne('https://joystickjunkies.azurewebsites.net/enviar-mensaje');
    expect(req.request.method).toBe('POST');
    req.flush({}); // Simula la respuesta exitosa del servidor

    // No es necesario otro tick() aquí ya que flush() resuelve inmediatamente la promesa.
    expect(component.success).toBeTrue();
    expect(component.loading).toBeFalse();
  }));

  it('should call sendEmail and handle error if service fails', fakeAsync(() => {
    component.modchipForm.setValue({
      name: 'Test Name',
      email: 'test@example.com',
      phone: '1234567890',
      switchModel: 'normal',
      menssage: 'Hello, this is a test message'
    });

    expect(component.modchipForm.valid).toBeTrue();
    component.onSubmit();

    tick(); // Esperar a que se realice la llamada HTTP

    const req = httpMock.expectOne('https://joystickjunkies.azurewebsites.net/enviar-mensaje');
    expect(req.request.method).toBe('POST');
    req.flush('Service failure', { status: 500, statusText: 'Internal Server Error' }); // Simula un fallo del servidor

    tick(); // Avanza el tiempo para que se complete la suscripción

    expect(component.errorMessage).toBe('Hubo un problema al enviar el mensaje');
    expect(component.loading).toBeFalse();
  }));
});
