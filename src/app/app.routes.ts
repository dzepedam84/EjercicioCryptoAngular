import { Routes } from '@angular/router';
import { RegistrarComponent } from './componentes/registrar/registrar.component';
import { VerificarComponent } from './componentes/verificar/verificar.component';

export const routes: Routes = [
    {path: 'registrar', component: RegistrarComponent},
    {path: 'verificar', component: VerificarComponent},
    {path: '', redirectTo: 'registrar', pathMatch: 'full'},
    {path: '**', component: RegistrarComponent}

];
