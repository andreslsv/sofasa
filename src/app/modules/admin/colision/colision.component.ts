import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { ApiService } from 'app/services/api.service';
import { Subject, takeUntil } from 'rxjs';
import { ColisionService } from './colision.service';

@Component({
  selector: 'app-colision',
  templateUrl: './colision.component.html',
  styleUrls: ['./colision.component.scss']
})
export class ColisionComponent implements OnInit {

  numeroInicial = 0;

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
  user: User;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  ubicaciones: any;
  zonasDisponibles: any;
  regionesDisponibles: any;
  sociedadesDisponibles: any;
  sedesDisponibles: any;

  constructor(private _formBuilder: FormBuilder, private _colisionService:ColisionService,private _userService: UserService,private _changeDetectorRef: ChangeDetectorRef, private _apiService:ApiService,private _snackBar: MatSnackBar) { }

  openSnackBar(mensaje){
    this._snackBar.open(mensaje, null, {duration: 4000});
  }

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

  obtenerApiDataUbicacion(){
    this.zonasDisponibles = this.ubicaciones.map((data)=>{return data.zona});
    this.regionesDisponibles = this.ubicaciones.map((data)=>{return data.region});
    this.sociedadesDisponibles = this.ubicaciones.map((data)=>{return data.sociedad});
    this.sedesDisponibles = this.ubicaciones.map((data)=>{return data.sede});
  }

  guardarColision(){
    const colision = {
      "fechaRegistro": "2023-03-28T23:20:32.347Z",
      "idUsuario": 0,
      "entradasxPuestoTrabajo": 0,
      "pulmonesPorPuestoTrabajo": 0,
      "puestosDeTrabajoCompletos": 0,
      "puestosDeTrabajoTotales": 0,
      "entradasPromedioTaller": 0,
      "personaProductivo": 0,
      "pulmones": 0,
      "totalHorasFacturadas": 0,
      "totalHorasTrabajadas": 0,
      "totalHorasDisponibles": 0,
      "horasHabilesLey": 0,
      "tiempoProductivo": 0,
      "promedioHorasFacturacion": 0,
      "puestoDesarmadoMarca": 0,
      "puestoLatoneriaMarca": 0,
      "puestoPreparacionMarca": 0,
      "cabinaDePinturaMarca": 0,
      "puestoDeArmadoMarca": 0,
      "puestoDeBrilladoMarca": 0,
      "puestoDesarmadoConce": 0,
      "puestoLatoneriaConce": 0,
      "puestoPreparacionConce": 0,
      "cabinaDePinturaConce": 0,
      "puestoDeArmadoConce": 0,
      "puestoDeBrilladoConce": 0,
      "tasaEmpleo": 0,
      "tasaEficiencia": 0,
      "productividad": 0,
      "aprovechamientoCapacidadServicio": 0,
      "capacidadServicioInstalada": 0,
      "tecnicosPuestoTrabajo": 0,
      "pulmonesPuestoTrabajo": 0,
      "pulmonesPuestoTrabajoCompleto": 0,
      "entradasPuestoTrabajo": 0,
      "entradasPotencialesPuestoTrabajo": 0,
      "region": "string",
      "zona": "string",
      "sociedad": "string",
      "sede": "string",
      "puestoTrabajoDefinidoMarca": 0
    };

    this.editarUbicaciones(colision);

    this._apiService.postQuery("Colision/GuardarColision","",colision).subscribe(async(result:any)=>{
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

  ngOnInit(): void {
    this._colisionService.getColision().subscribe((data)=>{
      this.dataColision=data;
    });

    this._userService.user$
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((user: User) => {
        this.user = user;
        this.ubicaciones=user?.ubicacion;

        this.obtenerApiDataUbicacion();

        // Mark for check
        this._changeDetectorRef.markForCheck();
    });
  }

}
