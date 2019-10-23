import { Component, OnInit } from '@angular/core';
import { EmpleadoServiceService } from 'src/app/services/empleado-service.service';
import { EmpleadoModel } from 'src/app/models/empleado.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-trabajadores',
  templateUrl: './trabajadores.component.html',
  styleUrls: ['./trabajadores.component.css']
})
export class TrabajadoresComponent implements OnInit {

  constructor(private _empleadosService:EmpleadoServiceService) { }
  empleados:EmpleadoModel[]=[]
  loading= false
  ngOnInit() {
    this.loading=true

    this._empleadosService.getEmpleados().subscribe((res)=>{
      this.empleados = res
      this.loading=false
    })
  }

  deleteHeroe(empleado:EmpleadoModel,i:number){
    Swal.fire({
      title:'¿Está seguro?',
      text:`Esto borara permanentemente a ${empleado.name}`,
      type:'question',
      showConfirmButton:true,
      showCancelButton:true
    }).then(res=>{
      if (res.value) {
        this.empleados.splice(i,1)
        this._empleadosService.deleteEmpleado(empleado.id).subscribe()
      }
    })
   
     
  }

}
