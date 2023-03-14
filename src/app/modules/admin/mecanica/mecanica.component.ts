import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MecanicaService } from './mecanica.service';

@Component({
  selector: 'app-mecanica',
  templateUrl: './mecanica.component.html',
  styleUrls: ['./mecanica.component.scss']
})
export class MecanicaComponent implements OnInit {

  mecanicaForm = this._formBuilder.group({
    ent_x_pues_de_tra     : [, [Validators.required]],
    pul_por_pue_tra       : [, [Validators.required]],
    ele_tot_mec           : [, [Validators.required]],
    ele_pro               : [, [Validators.required]],
    ent_pro_tal_6_mes     : [, [Validators.required]],
    tot_hor_fac           : [, [Validators.required]],
    tot_hor_tra           : [, [Validators.required]],
    tot_hor_dis           : [, [Validators.required]],
    tie_prod              : [, [Validators.required]],
    hor_hab_ley           : [, [Validators.required]],
    pro_hor_fac_por_ent   : [, [Validators.required]],
    pulmones              : [, [Validators.required]],
    tec_mec               : [, [Validators.required]]
  });

  seccionForm = this._formBuilder.group({
    region                : [, [Validators.required]],
    zona                  : [, [Validators.required]],
    sociedad              : [, [Validators.required]],
    sede                  : [, [Validators.required]],
  });

  displayedColumns: string[] = ['datos-generales', 'indicador'];
  dataMecanica:any;

  constructor(private _formBuilder: FormBuilder, private _mecanicaService:MecanicaService) { }

  recalcular(){
    const valores = this.mecanicaForm.value;

    this.dataMecanica.forEach(element => {
      if (element.formula) {
        element.indicador = element.formula(valores);
      }
    });

    this._mecanicaService.setMecanica(this.dataMecanica);
  }

  ngOnInit(): void {
    this._mecanicaService.getMecanica().subscribe((data)=>{
      this.dataMecanica=data;
    });
  }

}
