import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { EmailComponent } from './email.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { EmailserviceService } from '../emailservice.service';
import { of, throwError } from 'rxjs';

describe('EmailComponent', () => {
  let component: EmailComponent;
  let fixture: ComponentFixture<EmailComponent>;
  let emailServiceMock: any;

  beforeEach(async () => {
    // Setup mock service
    emailServiceMock = {
      sendEmail: jasmine.createSpy('sendEmail').and.returnValue(of({}))
    };

    await TestBed.configureTestingModule({
      imports: [
        EmailComponent,
        ReactiveFormsModule,
        MatInputModule,
        MatSelectModule,
        NoopAnimationsModule,
        CommonModule
      ],
      declarations: [],
      providers: [{ provide: EmailserviceService, useValue: emailServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(EmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not call sendEmail if form is invalid', () => {
    component.modchipForm.setValue({
      name: '',
      email: 'not-an-email',
      phone: '',
      switchModel: '',
      menssage: ''
    });
    component.onSubmit();
    expect(emailServiceMock.sendEmail).not.toHaveBeenCalled();
  });

  it('should call sendEmail and handle success if form is valid', (done: DoneFn) => {
    const response = { message: 'Success' };
    emailServiceMock.sendEmail.and.returnValue(of(response));

    component.modchipForm.setValue({
      name: 'Test Name',
      email: 'test@example.com',
      phone: '1234567890',
      switchModel: 'normal',
      menssage: 'Hello, this is a test message'
    });

    // Asegúrate de que el formulario sea válido
    expect(component.modchipForm.valid).toBeTrue();
    emailServiceMock.sendEmail.and.returnValue(of({}));
    component.onSubmit();

   // Espera a que se complete la operación asíncrona
  fixture.whenStable().then(() => {
    expect(emailServiceMock.sendEmail).toHaveBeenCalled();
    expect(component.success).toBeTrue();
    expect(component.loading).toBeFalse();
    done(); // Indica que la prueba ha terminado
  });;
  });

  it('should call sendEmail and handle error if service fails', () => {
    const errorResponse = new Error('Service failure');
   // emailServiceMock.sendEmail.and.returnValue(throwError(() => errorResponse));
    emailServiceMock.sendEmail.and.returnValue(throwError(() => new Error('Error simulado')));

    component.modchipForm.setValue({
      name: 'Test Name',
      email: 'test@example.com',
      phone: '1234567890',
      switchModel: 'normal',
      menssage: 'Hello, this is a test message'
    });
    component.onSubmit();

   
    fixture.whenStable().then(() => {
      expect(emailServiceMock.sendEmail).toHaveBeenCalled();
      expect(component.errorMessage).toBe('Hubo un problema al enviar el mensaje');
      expect(component.loading).toBeFalse();
    });;
  });
});
