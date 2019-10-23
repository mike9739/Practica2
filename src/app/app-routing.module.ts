import { NgModule } from '@angular/core';
import {Routes, RouterModule, Router} from '@angular/router'
import { TrabajadorComponent } from './pages/trabajador/trabajador.component';
import { TrabajadoresComponent } from './pages/trabajadores/trabajadores.component';


const routes : Routes =[
  {path:'Empleados',component:TrabajadoresComponent},
  {path:'Empleado/:id',component:TrabajadorComponent},
  {path:'**',pathMatch:'full',redirectTo:'Empleados'}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports :[RouterModule]
})
export class AppRoutingModule { }
