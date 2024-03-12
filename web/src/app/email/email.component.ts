import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { EmailserviceService } from '../emailservice.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from '../loader/loader.component';
import { SuccessComponent } from '../success/success.component';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.sass'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    HttpClientModule,
    RouterModule,
    CommonModule,
    LoaderComponent,
    SuccessComponent
  ],
  providers:[ ]
})
export class EmailComponent {
  errorMessage: string = 'hola';
  loading: boolean = false;
  success: boolean = false;
  successMsg:string = "Tu mensaje ha sido enviado, pronto te estaremos respondiendo."
  modchipForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private emailservice: EmailserviceService) {
    
    this.modchipForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      switchModel: ['', Validators.required],
      menssage: ['', Validators.required]
    });
  }

  onSubmit() {
    this.loading= true;
    if (this.modchipForm.valid) {
      this.emailservice.sendEmail(this.modchipForm.value).subscribe(      
        {
          next: (response) => {
            console.log('Success!', response)
            this.modchipForm.reset();
            this.success = true;
            this.loading= false;
            this.errorMessage="esta todo ok chango"
          },
          error: (error) => {
            this.errorMessage = 'Hubo un problema al enviar el mensaje'; // Configurar mensaje de error.

            this.loading = false;
          }
        });
    }else {
      this.loading = false; // Debes desactivar el estado de carga si el formulario no es válido.
      this.errorMessage = 'Hubo un problema al enviar el mensaje'; 
    }
  }
}
