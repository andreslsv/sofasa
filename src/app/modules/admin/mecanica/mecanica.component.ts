import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  usuario: User;
  zonasDisponibles: any;
  regionesDisponibles: any;
  sociedadesDisponibles: any;
  sedesDisponibles: any;
  ubicaciones:any;

  constructor(private _formBuilder: FormBuilder, private _mecanicaService:MecanicaService,private _userService: UserService,private _changeDetectorRef: ChangeDetectorRef, private _apiService:ApiService,private _snackBar: MatSnackBar) { }

  openSnackBar(mensaje){
    this._snackBar.open(mensaje, null, {duration: 4000});
  }

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
      "elevadoresProductivos": 0
    };

    this.editarUbicaciones(mecanica);

    this._apiService.postQuery("Mecanica/GuardarMecanica","",mecanica).subscribe(async(result:any)=>{
      if (result.isSuccess) {
        this.openSnackBar("Guardado");
      } else {
        this.openSnackBar("error");
      }
    });

  }

  editarUbicaciones(dataQuery){
    if (this.user?.admin==1) {
      dataQuery.region=this.seccionForm.value.region;
      dataQuery.zona=this.seccionForm.value.zona;
      dataQuery.sociedad=this.seccionForm.value.sociedad;
      dataQuery.sede=this.seccionForm.value.sede;
    } else {
      
    }
  }

  obtenerUbicacionesPorUsuario(){
    this._userService.user$
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(async(user: User) => {
        this.usuario = await user;
    });
  }

  obtenerApiDataUbicacion(){
    this.zonasDisponibles = this.ubicaciones.map((data)=>{return data.zona});
    this.regionesDisponibles = this.ubicaciones.map((data)=>{return data.region});
    this.sociedadesDisponibles = this.ubicaciones.map((data)=>{return data.sociedad});
    this.sedesDisponibles = this.ubicaciones.map((data)=>{return data.sede});
  }

  ngOnInit(): void {
    this._mecanicaService.getMecanica().subscribe((data)=>{
      this.dataMecanica=data;
    });

    this._userService.user$
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((user: User) => {
        this.user = user;
        this.ubicaciones=user?.ubicacion;

        this.obtenerApiDataUbicacion();

        // Mark for check
        //this._changeDetectorRef.markForCheck();
    });
  }

}
