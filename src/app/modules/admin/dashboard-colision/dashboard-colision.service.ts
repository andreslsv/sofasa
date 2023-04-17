import { Injectable } from '@angular/core';
import { AsyncSubject, BehaviorSubject } from 'rxjs';
import { ubicaciones, valoresGraficosDefaultEficiencia, valoresGraficosDefaultEntradas, valoresGraficosDefaultEstandar, valoresGraficosDefaultProductividad, valoresGraficosDefaultPuesto, valoresIndicadoresDefault } from './graficos';

@Injectable({
  providedIn: 'root'
})
export class DashboardColisionService {

  puestoCompleto = [0, 0, 0, 0, 0, 0, 0, 0];
  estandarElevadorProductivo = [0, 0, 0, 0, 0, 0, 0, 0];
  seleccionado = {zonasSelesccionadas:[], regionesSeleccionadas:[], sociedadesSeleccionadas:[], sedesSeleccionadas:[]};

  defaultPuestoCompleto=valoresGraficosDefaultPuesto;
  defaultEstandarElevador=valoresGraficosDefaultEstandar;
  defaultEficiencia=valoresGraficosDefaultEficiencia;
  defaultProductividad=valoresGraficosDefaultProductividad;
  defaultEntradas=valoresGraficosDefaultEntradas;
  indicadores = valoresIndicadoresDefault;

  private configPuestoCompleto$: BehaviorSubject<any> = new BehaviorSubject<any>(this.defaultPuestoCompleto);
  private configEstandarElevador$: BehaviorSubject<any> = new BehaviorSubject<any>(this.defaultEstandarElevador);
  private configEficiencia$: BehaviorSubject<any> = new BehaviorSubject<any>(this.defaultEficiencia);
  private configProductividad$: BehaviorSubject<any> = new BehaviorSubject<any>(this.defaultProductividad);
  private configEntradas$: BehaviorSubject<any> = new BehaviorSubject<any>(this.defaultEntradas);
  
  private apiDataDashboard$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  private apiDataDashboardBackup$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  private apiDataUbicaciones$: BehaviorSubject<any> = new BehaviorSubject<any>(ubicaciones);

  private indicadores$: BehaviorSubject<any> = new BehaviorSubject<any>(this.indicadores);
  private estandarElevadorProductivo$: BehaviorSubject<any> = new BehaviorSubject<any>(this.estandarElevadorProductivo);
  private zonas$: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  private seleccionado$: BehaviorSubject<any> = new BehaviorSubject<any>(this.seleccionado);

  getSeleccionado(){
    return this.seleccionado$.asObservable();
  }

  getApiDataDashboardBackup(){
    return this.apiDataDashboardBackup$.asObservable();
  }

  setApiDataDashboardBackup(valor){
    return this.apiDataDashboardBackup$.next(valor);
  }

  getConfigEntradas(){
    return this.configEntradas$.asObservable();
  }

  setConfigEntradas(valor){
    return this.configEntradas$.next(valor);
  }

  getConfigProductividad(){
    return this.configProductividad$.asObservable();
  }

  setConfigProductividad(valor){
    return this.configProductividad$.next(valor);
  }

  getConfigEficiencia(){
    return this.configEficiencia$.asObservable();
  }

  setConfigEficiencia(valor){
    return this.configEficiencia$.next(valor);
  }
  
  getConfigEstandarElevador(){
    return this.configEstandarElevador$.asObservable();
  }

  setConfigEstandarElevador(valor){
    return this.configEstandarElevador$.next(valor);
  }

  getConfigPuestoCompleto(){
    return this.configPuestoCompleto$.asObservable();
  }

  setConfigPuestoCompleto(valor){
    return this.configPuestoCompleto$.next(valor);
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

  setSeleccionados(valor){
    return this.seleccionado$.next(valor);
  }

  constructor() { }
}
