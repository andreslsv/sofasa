import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

export interface Usuario {
  idUsuarioBir?: string;
  cedula?: string;
  apellido?: string;
  nombre?: string;
  fechaNacimiento?: string;
  genero?: string,
  ipnToken?: string;
  telefono?: string;
  email?: string;
  funcionPrincipal?: string;
  funcionSecundaria?: string;
  sede?: string;
  sociedad?: string;
  duplicados?: string;
  codigoBir?: string;
  fechaCreacion?: string;
  zona?: string;
  region?: string;
}

const ELEMENT_DATA: Usuario[] = [
  {nombre: "Andres", apellido:"Salas Velasco", cedula: '1090481240', fechaNacimiento: "23-08-1994", genero: 'Hombre',ipnToken:"AAA", telefono:"3118976896", email:"fasalasdsgn@gmail.com", funcionPrincipal:"Desarrollador", sede:"Medellin",sociedad:"Ninugna"},
  {nombre: "Andres", apellido:"Salas Velasco", cedula: '1090481240', fechaNacimiento: "23-08-1994", genero: 'Hombre',ipnToken:"AAA", telefono:"3118976896", email:"fasalasdsgn@gmail.com", funcionPrincipal:"Desarrollador", sede:"Medellin",sociedad:"Ninugna"},
  {nombre: "Andres", apellido:"Salas Velasco", cedula: '1090481240', fechaNacimiento: "23-08-1994", genero: 'Hombre',ipnToken:"AAA", telefono:"3118976896", email:"fasalasdsgn@gmail.com", funcionPrincipal:"Desarrollador", sede:"Medellin",sociedad:"Ninugna"},
  {nombre: "Andres", apellido:"Salas Velasco", cedula: '1090481240', fechaNacimiento: "23-08-1994", genero: 'Hombre',ipnToken:"AAA", telefono:"3118976896", email:"fasalasdsgn@gmail.com", funcionPrincipal:"Desarrollador", sede:"Medellin",sociedad:"Ninugna"},
  {nombre: "Andres", apellido:"Salas Velasco", cedula: '1090481240', fechaNacimiento: "23-08-1994", genero: 'Hombre',ipnToken:"AAA", telefono:"3118976896", email:"fasalasdsgn@gmail.com", funcionPrincipal:"Desarrollador", sede:"Medellin",sociedad:"Ninugna"},
  {nombre: "Andres", apellido:"Salas Velasco", cedula: '1090481240', fechaNacimiento: "23-08-1994", genero: 'Hombre',ipnToken:"AAA", telefono:"3118976896", email:"fasalasdsgn@gmail.com", funcionPrincipal:"Desarrollador", sede:"Medellin",sociedad:"Ninugna"},
  {nombre: "Andres", apellido:"Salas Velasco", cedula: '1090481240', fechaNacimiento: "23-08-1994", genero: 'Hombre',ipnToken:"AAA", telefono:"3118976896", email:"fasalasdsgn@gmail.com", funcionPrincipal:"Desarrollador", sede:"Medellin",sociedad:"Ninugna"},
  {nombre: "Andres", apellido:"Salas Velasco", cedula: '1090481240', fechaNacimiento: "23-08-1994", genero: 'Hombre',ipnToken:"AAA", telefono:"3118976896", email:"fasalasdsgn@gmail.com", funcionPrincipal:"Desarrollador", sede:"Medellin",sociedad:"Ninugna"},
  {nombre: "Andres", apellido:"Salas Velasco", cedula: '1090481240', fechaNacimiento: "23-08-1994", genero: 'Hombre',ipnToken:"AAA", telefono:"3118976896", email:"fasalasdsgn@gmail.com", funcionPrincipal:"Desarrollador", sede:"Medellin",sociedad:"Ninugna"},
  {nombre: "Andres", apellido:"Salas Velasco", cedula: '1090481240', fechaNacimiento: "23-08-1994", genero: 'Hombre',ipnToken:"AAA", telefono:"3118976896", email:"fasalasdsgn@gmail.com", funcionPrincipal:"Desarrollador", sede:"Medellin",sociedad:"Ninugna"},
  {nombre: "Andres", apellido:"Salas Velasco", cedula: '1090481240', fechaNacimiento: "23-08-1994", genero: 'Hombre',ipnToken:"AAA", telefono:"3118976896", email:"fasalasdsgn@gmail.com", funcionPrincipal:"Desarrollador", sede:"Medellin",sociedad:"Ninugna"}
];

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  filtrosForm = this._formBuilder.group({
    nombre     : [, [Validators.required]],
    telefono     : [, [Validators.required]],
    cedula     : [, [Validators.required]],
    sede     : [, [Validators.required]],
  });

  displayedColumns: string[] = ['nombre', 'sede', 'telefono', 'email', 'cedula','genero','acciones'];
  dataSource = ELEMENT_DATA;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

}
