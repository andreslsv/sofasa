import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.scss']
})
export class AgregarUsuarioComponent implements OnInit {

  usuarioForm = this._formBuilder.group({
    nombre                 : [, [Validators.required]],
    apellido               : [, [Validators.required]],
    sede                   : [, [Validators.required]],
    telefono               : [, [Validators.required]],
    email                  : [, [Validators.required]],
    cedula                 : [, [Validators.required]],
    genero                 : [, [Validators.required]],
    fechaNacimiento        : [, [Validators.required]],
    funcionPrincipal       : [, [Validators.required]],
    funcionSecundaria      : [, [Validators.required]],
    sociedad               : [, [Validators.required]],
    duplicados             : [, [Validators.required]],
    codigoBir              : [, [Validators.required]],
    zona                   : [, [Validators.required]],
    region                 : [, [Validators.required]],
  });

  constructor(private _formBuilder: FormBuilder, public dialogRef: MatDialogRef<AgregarUsuarioComponent>) { }

  ngOnInit(): void {
  }

}
