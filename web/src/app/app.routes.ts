import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReservaComponent } from './reserva/reserva.component';
import { ChipeoComponent } from './chipeo/chipeo.component';
export const routes: Routes = [
    {path:'',
     component:HomeComponent,
     children:[
        { path:'', redirectTo:'chipeo',pathMatch:'full'},
        { path:'reserva', component:ReservaComponent},
        { path:'chipeo',component:ChipeoComponent}
     ]
    }
];
