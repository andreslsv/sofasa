import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AgregarUsuarioComponent } from 'app/modals/agregar-usuario/agregar-usuario.component';
import { SubirExcelUsuariosComponent } from 'app/modals/subir-excel-usuarios/subir-excel-usuarios.component';
import { ApiService } from 'app/services/api.service';

export interface Usuario {
  idUsuarioBir?: string;
  nombre?: string;
  apellido?: string;
  sede?: string;
  telefono?: string;
  email?: string;
  cedula?: string;
  genero?: string,
  fechaNacimiento?: string;
  ipnToken?: string;
  funcionPrincipal?: string;
  funcionSecundaria?: string;
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

  displayedColumns: string[] = ['nombre', 'apellido', 'cedula', 'telefono', 'email', 'idUsuarioBir', 'genero', 'funcionPrincipal', 'funcionSecundaria','acciones'];
  dataSource = ELEMENT_DATA;
  dataUsuarios: any;

  constructor(private _formBuilder: FormBuilder,public _dialog: MatDialog,private _apiService: ApiService) { }

  opensuburExcelUsuariosModal() {
    const dialogRef = this._dialog.open(SubirExcelUsuariosComponent, {
      width: '350px',
      height: 'auto',
      }
    );

    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }

  agregarUsuarioModal(){
    const dialogRef = this._dialog.open(AgregarUsuarioComponent, {
      minWidth: '500px',
      height: 'auto',
      }
    );

    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }

  seleccionarSeccion(){
    this._apiService.getQuery("Usuario/ObtenerUsuarios","").subscribe(async(data:any)=>{
      this.dataUsuarios = await data.result;
    });
  }

  ngOnInit(): void {
    this.seleccionarSeccion();
  }

}
