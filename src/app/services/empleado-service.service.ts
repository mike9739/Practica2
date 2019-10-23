import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmpleadoModel } from '../models/empleado.model';
import { map,delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoServiceService {
  private url = 'https://empleados-c4a82.firebaseio.com'
  constructor(private http:HttpClient) { }
  crearEmpleado(empleado:EmpleadoModel){
    return this.http.post(`${this.url}/empleados.json`,empleado).
    pipe(
      map((res:any)=>{
        empleado.id = res.name
        return empleado;
      })
    )
  }
  actualizarEmpleado(empleado:EmpleadoModel){
      const empleadoTemp = {
        ...empleado
      }
      delete empleadoTemp.id
      return this.http.put(`${this.url}/empleados/${empleado.id}.json`,empleadoTemp)
  }
  getEmpleados(){
    return this.http.get(`${this.url}/empleados.json`).pipe(
      map(this.crearArray),delay(90)
    )
  }

  getEmpleado(id:string){
    return this.http.get(`${this.url}/empleados/${id}.json`)
  }

  deleteEmpleado(id:string){
    return this.http.delete(`${this.url}/empleados/${id}.json`)
  }
  private crearArray(empleadoObj:object){
    const empleados : EmpleadoModel[] = []
    if(empleadoObj === null){return []}

    Object.keys(empleadoObj).forEach(key=>{
      const empleado:EmpleadoModel = empleadoObj[key];
      empleado.id = key
      empleados.push(empleado)
    })

    return empleados
  }
}
