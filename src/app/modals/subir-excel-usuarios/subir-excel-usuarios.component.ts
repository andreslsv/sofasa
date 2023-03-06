import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subir-excel-usuarios',
  templateUrl: './subir-excel-usuarios.component.html',
  styleUrls: ['./subir-excel-usuarios.component.scss']
})
export class SubirExcelUsuariosComponent implements OnInit {
  documento: any;

  constructor() { }

  setDocumento(evento: any) {
    this.documento=evento.target.files[0];
  }

  ngOnInit(): void {
  }

}
