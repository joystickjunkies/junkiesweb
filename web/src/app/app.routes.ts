import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReservaComponent } from './reserva/reserva.component';
import { ChipeoComponent } from './chipeo/chipeo.component';
import { WhatsappComponent } from './whatsapp/whatsapp.component';
import { EmailComponent } from './email/email.component';
import { LoaderComponent } from './loader/loader.component';
import { SuccessComponent } from './success/success.component';

export const routes: Routes = [
    {path:'',
     component:HomeComponent,
     children:[
        { path:'', redirectTo:'chipeo',pathMatch:'full'},
        { path:'chipeo',component:ChipeoComponent},
        {path:'succeess',component:SuccessComponent},
        { path:'reserva',component:ReservaComponent,
            children:[
                { path: '', redirectTo: 'whatsapp', pathMatch: 'full' },
                { path:'whatsapp',component:WhatsappComponent},
                { path:'email',component:EmailComponent,
                    children:[
                        {path:'loader',component:LoaderComponent}
                    ]
                }
            ]
        }
     ]
    }  
];
