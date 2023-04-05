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
        element.indicador = element.formula(valores,valores2);
      }
    });

    this._colisionService.setColision(this.dataColision);
  }

  obtenerApiDataUbicacion(){
    this.zonasDisponibles = this.filtrarElementosDuplicadas(this.ubicaciones.map((data)=>{return data.zona}));
    this.regionesDisponibles = this.filtrarElementosDuplicadas(this.ubicaciones.map((data)=>{return data.region}));
    this.sociedadesDisponibles = this.filtrarElementosDuplicadas(this.ubicaciones.map((data)=>{return data.sociedad}));
    this.sedesDisponibles = this.filtrarElementosDuplicadas(this.ubicaciones.map((data)=>{return data.sede}));
  }

  guardarColision(){

    const valores=this.seccionForm.value;
    const puestosTrabajoForm=this.puestosTrabajoForm.value;

    let colision = {
      "fechaRegistro": "2023-03-28T23:20:32.347Z",
      "idUsuario":this.user?.id,
      "pulmonesPorPuestoTrabajo": this.mecanicaForm.value.pul_por_pue_tra,
      "entradasPromedioTaller": this.mecanicaForm.value.ent_pro_tal,
      "pulmones": this.mecanicaForm.value.pulmones,
      "totalHorasFacturadas": this.mecanicaForm.value.tot_hor_fac,
      "totalHorasTrabajadas":  this.mecanicaForm.value.tot_hor_tra,
      "totalHorasDisponibles": this.mecanicaForm.value.tot_hor_dis,
      "horasHabilesLey": this.mecanicaForm.value.hor_hab_ley,
      "tiempoProductivo": this.mecanicaForm.value.tie_pro,
      "promedioHorasFacturacion": this.mecanicaForm.value.pro_hor_fac_por_ent,

      /*Puesto desarmado*/

      "puestoDesarmadoMarca": puestosTrabajoForm.ej_puesto_desarmado,
      "puestoDesarmadoConce": puestosTrabajoForm.tec_puesto_desarmado,

      "puestoLatoneriaMarca": puestosTrabajoForm.ej_puesto_latoneria,
      "puestoLatoneriaConce": puestosTrabajoForm.tec_puesto_latoneria,

      "puestoPreparacionMarca": puestosTrabajoForm.ej_puesto_preparacion,
      "puestoPreparacionConce": puestosTrabajoForm.tec_puesto_preparacion,

      "cabinaDePinturaMarca": puestosTrabajoForm.ej_cabina_pintura,
      "cabinaDePinturaConce": puestosTrabajoForm.tec_cabina_pintura,

      "puestoDeArmadoMarca": puestosTrabajoForm.ej_cabina_pintura,
      "puestoDeArmadoConce": puestosTrabajoForm.tec_cabina_pintura,
      
      "puestoDeBrilladoMarca": puestosTrabajoForm.ej_puesto_brillado,
      "puestoDeBrilladoConce": puestosTrabajoForm.tec_puesto_brillado,

      //"puestoTrabajoDefinidoMarca": 0,

    };

    const colision2 = {
      "personaProductivo": 0,
      "puestosDeTrabajoTotales": 0,
      "puestosDeTrabajoCompletos": 0,
      "entradasxPuestoTrabajo": 0,//-------------
      "tasaEmpleo": 0,
      "tasaEficiencia": 0,
      "productividad": 0,
      "aprovechamientoCapacidadServicio": 0,
      "capacidadServicioInstalada": 0,
      "tecnicosPuestoTrabajo": 0,
      "pulmonesPuestoTrabajo": 0,
      "pulmonesPuestoTrabajoCompleto": 0,
      "entradasPuestoTrabajo": 0,//-------------
      "entradasPotencialesPuestoTrabajo": 0,
      "puestoTrabajoDefinidoMarca": 0,
    }

    if (!valores.region && this.user?.admin==1) {
      this._snackBar.open('Región no seleccionada', null, {duration: 4000});
      return;
    }

    if (!valores.zona && this.user?.admin==1) {
      this._snackBar.open('Zona no seleccionada', null, {duration: 4000});
      return;
    }

    if (!valores.sociedad && this.user?.admin==1) {
      this._snackBar.open('Sociedad no seleccionada', null, {duration: 4000});
      return;
    }

    if (!valores.sede && this.user?.admin==1) {
      this._snackBar.open('Sede no seleccionada', null, {duration: 4000});
      return;
    }

    this.guardarFormulas(colision2);
    this.editarUbicaciones(colision);

    colision = {...colision, ...colision2};

    this._apiService.postQuery("Colision/GuardarColision","",colision).subscribe(async(result:any)=>{
      if (result.isSuccess) {
        this.openSnackBar("Guardado");
        this.mecanicaForm.reset();
        this.seccionForm.reset();
      } else {
        this.openSnackBar("error");
      }
    });
  }

  guardarFormulas(colision2){
    const valores = this.mecanicaForm.value;
    const valores2 = this.puestosTrabajoForm.value;

    this.dataColision.forEach((data)=>{
      if (colision2[data.nombreVariable] || colision2[data.nombreVariable]==0) {
        colision2[data.nombreVariable] = data.formula(valores,valores2).toFixed(2);
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
      dataQuery.region=this.ubicaciones[0]?.region;
      dataQuery.zona=this.ubicaciones[0]?.zona;
      dataQuery.sociedad=this.ubicaciones[0]?.sociedad;
      dataQuery.sede=this.ubicaciones[0]?.sede;
    }
  }

  filtrarElementosDuplicadas(lista){
    return lista.filter((item, index) => lista.indexOf(item) === index);
  }

  getCaracterPorcentaje(elemento){
    if (elemento.nombreVariable=="tasaEmpleo" || elemento.nombreVariable=="tasaEficiencia" || elemento.nombreVariable=="productividad" || elemento.nombreVariable=="aprovechamientoCapacidadServicio" || elemento.nombreVariable=="capacidadDeServicioInstalada") {
      return "%";
    }else{
      return "";
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
