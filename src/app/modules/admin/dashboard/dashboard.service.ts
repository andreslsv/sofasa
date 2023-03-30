import { Injectable } from '@angular/core';
import { AsyncSubject, BehaviorSubject } from 'rxjs';
import { valoresGraficosDefault, valoresIndicadoresDefault } from './graficos';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  puestoCompleto = [0, 0, 0, 0, 0, 0, 0, 0];
  estandarElevadorProductivo = [0, 0, 0, 0, 0, 0, 0, 0];

  indicadores = valoresIndicadoresDefault;

  private configPuestoCompleto$: BehaviorSubject<any> = new BehaviorSubject<any>(valoresGraficosDefault);
  
  private apiDataDashboard$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  private apiDataUbicaciones$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  private indicadores$: BehaviorSubject<any> = new BehaviorSubject<any>(this.indicadores);
  private eficiencia$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  private estandarElevadorProductivo$: BehaviorSubject<any> = new BehaviorSubject<any>(this.estandarElevadorProductivo);
  private zonas$: BehaviorSubject<any> = new BehaviorSubject<any>([]);


  getConfigPuestoCompleto(){
    return this.configPuestoCompleto$.asObservable();
  }

  setConfigPuestoCompleto(valor){
    return this.configPuestoCompleto$.next(valor);
  }

  getEficiencia(){
    return this.eficiencia$.asObservable();
  }

  setEficiencia(valor){
    return this.eficiencia$.next(valor);
  }

  getApiDataDashboard(){
    return this.apiDataDashboard$.asObservable();
  }

  setApiDataDashboard(valor){
    return this.apiDataDashboard$.next(valor);
  }

  getApiDataUbicacion(){
    return this.apiDataUbicaciones$.asObservable();
  }

  setApiDataUbicacion(valor){
    return this.apiDataUbicaciones$.next(valor);
  }

  getEstandarElevadorProductivo(){
    return this.estandarElevadorProductivo$.asObservable();
  }

  getIndicadores(){
    return this.indicadores$.asObservable();
  }

  getZonas(){
    return this.zonas$.asObservable();
  }

  setIndicadores(valor){
    return this.indicadores$.next(valor);
  }

  setEstandarElevadorProductivo(valor){
    return this.estandarElevadorProductivo$.next(valor);
  }

  setZonas(valor){
    return this.zonas$.next(valor);
  }

  constructor() { }

}