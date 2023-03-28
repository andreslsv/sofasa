import { Injectable } from '@angular/core';
import { AsyncSubject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  puestoCompleto = [0, 0, 0, 0, 0, 0, 0, 0];
  estandarElevadorProductivo = [0, 0, 0, 0, 0, 0, 0, 0];
  fichajeRedRenault=[10,6];
  clipRedRenault=[1,8];



  labelsDataPuestoCompleto = {
    categories: [],//Estas son las etiquetas que se muestran
    position: "top",
    labels: {
      offsetY: 0,
      style:{
        colors:"#fff"
      }
    },
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    },
    crosshairs: {
      fill: {
        type: "gradient",
        gradient: {
          colorFrom: "#EFDF00",
          colorTo: "#BED1E6",
          stops: [0, 100],
          opacityFrom: 0.4,
          opacityTo: 0.5
        }
      }
    },
    tooltip: {
      enabled: true,
      offsetY: -35
    }
  };



  
  actividadesSede = [
    {
      clave:"VN",
      valor: 0
    },
    {
      clave:"Renault selection",
      valor: 0
    },
    {
      clave:"Venta Electricos",
      valor: 0
    },
    {
      clave:"Colision",
      valor: 0
    },
    {
      clave:"Mecánica",
      valor: 0
    },
    {
      clave:"R. Minuto",
      valor: 0
    },
    {
      clave:"PRO+",
      valor: 0
    },
    {
      clave:"Taller Eléctricos",
      valor: 0
    }
  ];

  personalProductivo = [
    {
      clave:"Control Calidad",
      valor: 0
    },
    {
      clave:"Tecnico",
      valor: 0
    },
    {
      clave:"Electromecánico",
      valor: 0
    },
    {
      clave:"COTEC",
      valor: 0
    }
  ];

  indicadores = [
    {
      clave:"Tasa ocupacion",
      valor: 0
    },
    {
      clave:"Tasa eficiencia",
      valor: 0
    },
    {
      clave:"Tasa empleo",
      valor: 0
    },
    {
      clave:"Capacidad de servicio - puesto completo",
      valor: 0
    },
    {
      clave:"Tecnicos / elevadores",
      valor: 0
    },
    {
      clave:"Pulmones / elevador",
      valor: 0
    },
    {
      clave:"Puestos de trabajo - completos",
      valor: 0
    },
    {
      clave:"Elevadores",
      valor: 0
    },
    {
      clave:"Entradas totales",
      valor: 0
    },
    {
      clave:"Entradas x puesto completo",
      valor: 0
    }
  ];

  private apiDataDashboard$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  private dataFiltradaDashboard$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  private apiDataUbicaciones$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  private dataFiltradaUbicaciones$: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  private actividadSede$: BehaviorSubject<any> = new BehaviorSubject<any>(this.actividadesSede);
  private personalProductivo$: BehaviorSubject<any> = new BehaviorSubject<any>(this.personalProductivo);
  private indicadores$: BehaviorSubject<any> = new BehaviorSubject<any>(this.indicadores);
  private puestoCompleto$: BehaviorSubject<any> = new BehaviorSubject<any>(this.puestoCompleto);
  private labelsPuestoCompleto$: BehaviorSubject<any> = new BehaviorSubject<any>(this.labelsDataPuestoCompleto);
  private estandarElevadorProductivo$: BehaviorSubject<any> = new BehaviorSubject<any>(this.estandarElevadorProductivo);

  private fichajeRedRenault$: BehaviorSubject<any> = new BehaviorSubject<any>(this.fichajeRedRenault);
  private clipRedRenault$: BehaviorSubject<any> = new BehaviorSubject<any>(this.clipRedRenault);

  private zonas$: BehaviorSubject<any> = new BehaviorSubject<any>([]);


  getApiDataDashboard(){
    return this.apiDataDashboard$.asObservable();
  }

  setApiDataDashboard(valor){
    return this.apiDataDashboard$.next(valor);
  }

  getDataFiltradaDashboard(){
    return this.dataFiltradaDashboard$.asObservable();
  }

  setDataFiltradaDashboard(valor){
    return this.dataFiltradaDashboard$.next(valor);
  }

  getApiDataUbicacion(){
    return this.apiDataUbicaciones$.asObservable();
  }

  setApiDataUbicacion(valor){
    return this.apiDataUbicaciones$.next(valor);
  }

  getDataFiltradaUbicacion(){
    return this.dataFiltradaUbicaciones$.asObservable();
  }

  setDataFiltradaUbicacion(valor){
    return this.dataFiltradaUbicaciones$.next(valor);
  }

  getActividadSede(){
    return this.actividadSede$.asObservable();
  }

  getEstandarElevadorProductivo(){
    return this.estandarElevadorProductivo$.asObservable();
  }

  getPuestoCompleto(){
    return this.puestoCompleto$.asObservable();
  }

  getLabelsPuestoCompleto(){
    return this.labelsPuestoCompleto$.asObservable();
  }

  getIndicadores(){
    return this.indicadores$.asObservable();
  }

  getPersonalProductivo(){
    return this.personalProductivo$.asObservable();
  }

  getFichajeRedRenault(){
    return this.fichajeRedRenault$.asObservable();
  }

  getClipRedRenault(){
    return this.clipRedRenault$.asObservable();
  }

  getZonas(){
    return this.zonas$.asObservable();
  }

  setActividadSede(valor){
    return this.actividadSede$.next(valor);
  }

  setPersonalProductivo(valor){
    return this.personalProductivo$.next(valor);
  }

  setIndicadores(valor){
    return this.indicadores$.next(valor);
  }

  setPuestoCompleto(valor){
    return this.puestoCompleto$.next(valor);
  }

  setLabelsPuestoCompleto(valor){
    return this.labelsPuestoCompleto$.next(valor);
  }

  setEstandarElevadorProductivo(valor){
    return this.estandarElevadorProductivo$.next(valor);
  }

  setZonas(valor){
    return this.zonas$.next(valor);
  }

  constructor() { }

}