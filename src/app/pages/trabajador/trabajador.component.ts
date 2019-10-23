import { Component, OnInit } from '@angular/core';
import { EmpleadoModel } from 'src/app/models/empleado.model';
import { NgForm } from '@angular/forms';
import { EmpleadoServiceService } from 'src/app/services/empleado-service.service';
import Swal from 'sweetalert2'
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trabajador',
  templateUrl: './trabajador.component.html',
  styleUrls: ['./trabajador.component.css']
})
export class TrabajadorComponent implements OnInit {

  empleado = new EmpleadoModel();

  constructor(private _empleadoService: EmpleadoServiceService , private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')
    if (id !== 'nuevo') {
        this._empleadoService.getEmpleado(id).subscribe((res:any)=>{
          this.empleado = res
          this.empleado.id = id;
        })

    }
  }

  saveEmploy(form:NgForm){
    if (form.invalid) {
      alert('Los datos introducidos no son validos')
      return
    }

    Swal.fire({
      title:'Espere',
      text:'Guardando información',
      type:'info',
      allowOutsideClick:false
    })
    Swal.showLoading();
    let peticion : Observable<any>

    if (this.empleado.id) {
      peticion= this._empleadoService.actualizarEmpleado(this.empleado)
    }
    else{
      peticion= this._empleadoService.crearEmpleado(this.empleado)
    }
    peticion.subscribe(res=>{
      Swal.fire({
        title:this.empleado.name,
        text:'Se actualizó la informacion',
        type: 'success'
      })
    })
   
  }
}
