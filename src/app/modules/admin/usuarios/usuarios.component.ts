import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SubirExcelUsuariosComponent } from 'app/modals/subir-excel-usuarios/subir-excel-usuarios.component';

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
  {nombre: "Juan Carlos", apellido:"García", cedula: '1523568965', fechaNacimiento: "12-05-1998", genero: 'Hombre',ipnToken:"AAA", telefono:"3258987896", email:"dfgdfg@gmail.com", funcionPrincipal:"Help desk", sede:"Medellin",sociedad:"Ninugna"},
  {nombre: "Fredy", apellido:"Fuentes", cedula: '1258696636', fechaNacimiento: "01-06-1992", genero: 'Hombre',ipnToken:"AAA", telefono:"3002225468", email:"f758fsd@gmail.com", funcionPrincipal:"Desarrollador", sede:"Medellin",sociedad:"Ninugna"},
  {nombre: "Diana Sofia", apellido:"Velasquez", cedula: '1255789456', fechaNacimiento: "02-10-1996", genero: 'Hombre',ipnToken:"CCQ", telefono:"3117525417", email:"ufhfghj8@gmail.com", funcionPrincipal:"Help desk", sede:"Cali",sociedad:"Ninugna"},
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

  constructor(private _formBuilder: FormBuilder,public _dialog: MatDialog) { }

  opensuburExcelUsuariosModal() {
    const dialogRef = this._dialog.open(SubirExcelUsuariosComponent, {
      width: '350px',
      height: 'auto',
      }
    );

    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }

  ngOnInit(): void {
  }

}
