import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { ApiService } from 'app/services/api.service';
import { Subject, takeUntil } from 'rxjs';
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

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  displayedColumns: string[] = ['datos-generales', 'indicador'];
  dataMecanica:any;
  user: User;

  constructor(private _formBuilder: FormBuilder, private _mecanicaService:MecanicaService,private _userService: UserService,private _changeDetectorRef: ChangeDetectorRef, private _apiService:ApiService) { }

  recalcular(){
    const valores = this.mecanicaForm.value;

    this.dataMecanica.forEach(element => {
      if (element.formula) {
        element.indicador = element.formula(valores);
      }
    });

    this._mecanicaService.setMecanica(this.dataMecanica);
  }

  guardarMecanica(){

    const mecanica = {
      "fechaRegistro": "2023-03-28T19:58:17.931Z",
      "idUsuario": this.user?.id,
      "entradasxPuestoTrabajo": this.mecanicaForm?.value?.ent_x_pues_de_tra,
      "pulmonesPorPuestoTrabajo": this.mecanicaForm?.value?.pul_por_pue_tra,
      "puestosDeTrabajoCompletos": 0,
      "elevadoresTotalesMecanica": this.mecanicaForm?.value?.ele_tot_mec,
      "entradasPromedioTaller": this.mecanicaForm?.value?.ent_pro_tal_6_mes,
      "tecnicosMecanicosElectromecanicos":  this.mecanicaForm?.value?.ent_pro_tal_6_mes,
      "pulmones": this.mecanicaForm?.value?.pulmones,
      "totalHorasFacturadas": this.mecanicaForm?.value?.tot_hor_fac,
      "totalHorasTrabajadas": this.mecanicaForm?.value?.tot_hor_tra,
      "totalHorasDisponibles": this.mecanicaForm?.value?.tot_hor_dis,
      "horasHabilesLey": this.mecanicaForm?.value?.hor_hab_ley,
      "tiempoProductivo": this.mecanicaForm?.value?.tie_prod,
      "promedioHorasFacturacionEntrada": this.mecanicaForm?.value?.pro_hor_fac_por_ent,
      "tasaEmpleo": 0,
      "tasaEficiencia": 0,
      "productividad": 0,
      "aprovechamientoCapacidadServicio": 0,
      "capacidadDeServicioInstalada": 0,
      "tecnicosElevadoresTotales": 0,
      "pulmonesElevadoresTotales": 0,
      "pulmonesElevadoresProductivos": 0,
      "entradasPuestoTrabajo": 0,
      "entradasPotenciales": 0,
      "region": "string",
      "zona": "string",
      "sociedad": "string",
      "sede": "string",
      "elevadoresProductivos": 0
    };

    this._apiService.postQuery("Mecanica/GuardarMecanica","",mecanica).subscribe(async(data:any)=>{
      console.log("Resultado de guardar mecánica");
    });

  }

  ngOnInit(): void {
    this._mecanicaService.getMecanica().subscribe((data)=>{
      this.dataMecanica=data;
    });

    this._userService.user$
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((user: User) => {
        this.user = user;

        // Mark for check
        this._changeDetectorRef.markForCheck();
    });
  }

}
