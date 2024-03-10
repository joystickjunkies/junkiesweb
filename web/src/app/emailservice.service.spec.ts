import { TestBed } from '@angular/core/testing';

import { EmailserviceService } from './emailservice.service';
import {HttpClientTestingModule, HttpTestingController }from '@angular/common/http/testing';

describe('EmailserviceService', () => {
  let service: EmailserviceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[EmailserviceService]
    });
    service = TestBed.inject(EmailserviceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya solicitudes pendientes
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('sendEmail should send post request', () => {
    const mockFormData = { name: 'Test Name', email: 'test@example.com', message: 'Hi there!' };

    service.sendEmail(mockFormData).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne('https://joystickjunkies.azurewebsites.net/enviar-mensaje');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockFormData);
    req.flush({}); // Simula una respuesta exitosa
  });
});
