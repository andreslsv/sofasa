import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'app/services/api.service';

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.scss']
})
export class AgregarUsuarioComponent implements OnInit {
  dataUsuario:any;

  usuarioForm = this._formBuilder.group({
    nombre                 : [, [Validators.required]],
    apellido               : [, [Validators.required]],
    idUsuarioBir           : [, [Validators.required]],
    ipnToken               : [, [Validators.required]],
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

  constructor(private _formBuilder: FormBuilder, public dialogRef: MatDialogRef<AgregarUsuarioComponent>,private _apiService:ApiService,@Inject(MAT_DIALOG_DATA) public data: any,private _snackBar: MatSnackBar) { }

  generarUsuario(id=null){
    const valores = this.usuarioForm.value;
    const dataUsuario:any=[{
      "cedula": valores.cedula,
      "codigoBir": valores.codigoBir,
      "idUsuarioBir": valores.idUsuarioBir,
      "apellido":valores.apellido,
      "nombre": valores.nombre,
      "fechaDeNacimiento": "2023-04-10T14:09:58.663Z",
      "genero": valores.genero,
      "ipnToken": valores.ipnToken,
      "telefono": valores.telefono,
      "email": valores.email,
      "funcionPrincipal": valores.funcionPrincipal,
      "funcionSecundaria": valores.funcionSecundaria,
      "sede": valores.sede,
      "sociedad": valores.sociedad,
      "duplicados": valores.duplicados,
      "fechaDeCreacion": "2023-04-10T14:09:58.663Z",
      "zona": "ZONA4",
      "region": valores.region,
      "clave": "1234567"
    }];
    if(id)dataUsuario.id=id;
    return dataUsuario;
  }
  
  guardarUsuario(){
    this._apiService.postQuery("Usuario/CrearUsuario","",this.generarUsuario()).subscribe(async(result:any)=>{
      if (result.isSuccess) {
        this.openSnackBar("Usuario creado correctamente");
        this.dialogRef.close();
      }else{
        this.openSnackBar("Ha ocurrido un error");
      }
    });
  }

  obtenerUsuario(){

    const dataUsuario={
      "id": this.data?.usuario?.idUsuarioBir,
      "email": this.data?.usuario?.email,
      "cedula": this.data?.usuario?.cedula,
      "codigoBir": this.data?.usuario?.codigoBir
    }

    console.log("Este es el valor de daataUsuario", dataUsuario);

    this._apiService.postQuery("Usuario/ObtenerUsuario","",dataUsuario).subscribe(async(data:any)=>{
      this.dataUsuario = await data.result;
    });
  }

  openSnackBar(mensaje){
    this._snackBar.open(mensaje, null, {duration: 4000});
  }

  ngOnInit(): void {
    console.log("Este es el valor de la data devuelta", this.data);
    if (this.data?.usuario?.idUsuarioBir) {
      this.obtenerUsuario();
    }
  }

}
