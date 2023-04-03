import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'app/services/api.service';

@Component({
  selector: 'app-subir-excel-usuarios',
  templateUrl: './subir-excel-usuarios.component.html',
  styleUrls: ['./subir-excel-usuarios.component.scss']
})
export class SubirExcelUsuariosComponent implements OnInit {
  documento: any;

  constructor(private _apiService:ApiService,private _snackBar: MatSnackBar,public dialogRef: MatDialogRef<SubirExcelUsuariosComponent>) { }

  setDocumento(evento: any) {
    this.documento=evento.target.files[0];
  }

  subir(){
    const formData = new FormData();
    formData.append('file', this.documento);

    this._apiService.postQuery("Usuario/SubirUsuarios","",formData).subscribe(async(result:any)=>{
      if (result.isSuccess) {
        this.openSnackBar("Subido");
        this.dialogRef.close();
      } else {
        this.openSnackBar("error");
      }
    });
  }

  openSnackBar(mensaje){
    this._snackBar.open(mensaje, null, {duration: 4000});
  }

  ngOnInit(): void {
  }

}
