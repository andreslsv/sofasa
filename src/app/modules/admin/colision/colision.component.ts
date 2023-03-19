import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ColisionService } from './colision.service';

@Component({
  selector: 'app-colision',
  templateUrl: './colision.component.html',
  styleUrls: ['./colision.component.scss']
})
export class ColisionComponent implements OnInit {

  mecanicaForm = this._formBuilder.group({
    pul_por_pue_tra     : [, [Validators.required]],
    pulmones            : [, [Validators.required]],
    ent_pro_tal         : [, [Validators.required]],
    tot_hor_fac         : [, [Validators.required]],
    tot_hor_tra         : [, [Validators.required]],
    tot_hor_dis         : [, [Validators.required]],
    hor_hab_ley         : [, [Validators.required]],
    tie_pro             : [, [Validators.required]],
    pro_hor_fac_por_ent : [, [Validators.required]],
  });

  seccionForm = this._formBuilder.group({
    region                : [, [Validators.required]],
    zona                  : [, [Validators.required]],
    sociedad              : [, [Validators.required]],
    sede                  : [, [Validators.required]],
  });

  puestosTrabajoForm = this._formBuilder.group({
    ej_puesto_desarmado                 : [, [Validators.required]],
    tec_puesto_desarmado                : [, [Validators.required]],
    ej_puesto_latoneria                 : [, [Validators.required]],
    tec_puesto_latoneria                : [, [Validators.required]],
    ej_puesto_preparacion               : [, [Validators.required]],
    tec_puesto_preparacion              : [, [Validators.required]],
    ej_cabina_pintura                   : [, [Validators.required]],
    tec_cabina_pintura                  : [, [Validators.required]],
    ej_puesto_armado                    : [, [Validators.required]],
    tec_puesto_armado                   : [, [Validators.required]],
    ej_puesto_brillado                  : [, [Validators.required]],
    tec_puesto_brillado                 : [, [Validators.required]],
  });

  displayedColumns: string[] = ['datos-generales', 'indicador'];
  dataColision:any;

  constructor(private _formBuilder: FormBuilder, private _colisionService:ColisionService) { }

  sumatoriaPuestosTrabajo(){
    const valores = this.puestosTrabajoForm.value;
    const sumatoria=valores.puesto_desarmado+valores.puesto_latoneria+valores.puesto_preparacion+valores.cabina_pintura+valores.puesto_armado+valores.puesto_brillado
    return sumatoria;
  }

  recalcular(){
    const valores = this.mecanicaForm.value;
    const valores2 = this.puestosTrabajoForm.value;

    this.dataColision.forEach(element => {
      if (element.formula) {
        console.log("Este es el valor de los valores", valores);
        element.indicador = element.formula(valores,valores2);
      }
    });

    this._colisionService.setColision(this.dataColision);
  }

  ngOnInit(): void {
    this._colisionService.getColision().subscribe((data)=>{
      this.dataColision=data;
    });
  }

}
