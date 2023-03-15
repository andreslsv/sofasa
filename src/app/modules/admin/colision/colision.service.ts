import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColisionService {

  dataMecanica=[
    {
      datosGenerales:"Tasa Empleo",
      labelFormula:"Total horas trabajadas / Total horas disponibles",
      indicador:0,
      formula:(valores)=>{return valores.tot_hor_tra/valores.tot_hor_dis}
    },
    {
      datosGenerales:"Tasa Eficiencia",
      labelFormula:"Total horas facturadas / Total horas disponibles",
      indicador:0,
      formula:(valores)=>{return valores.tot_hor_fac/valores.tot_hor_dis}
    },
    {
      datosGenerales:"Productividad",
      labelFormula:"Total horas facturadas / Total horas trabajadas",
      indicador:0,
      formula:(valores)=>{return valores.tot_hor_fac/valores.tot_hor_tra}
    },
    {
      datosGenerales:"Aprovechamiento Capacidad Servicio - Puesto completo",
      labelFormula:"(Entradas Promedio Taller / Elevadores Productivos) / Entradas x Puestos De Trabajo",
      indicador:0,
      formula:(valores)=>{return (valores.ent_pro_tal_6_mes/valores.ele_pro)/valores.ent_x_pues_de_tra}
    },
    {
      datosGenerales:"Capacidad de servicio instalada",
      labelFormula:"Entradas Promedio Taller / (Elevadores Totales - Mecánida*Entradas x Puestos de trabajo",
      indicador:0,
      formula:(valores)=>{return valores.ent_pro_tal_6_mes/(valores.ele_tot_mec*valores.ent_x_pues_de_tra)}
    },
    {
      datosGenerales:"Tecnicos / Elevadores Totales - Mecanica",
      labelFormula:"Elevadores Totales/Técnicos mecánicos + Electrónica",
      indicador:0,
      formula:(valores)=>{return valores.ele_tot_mec/valores.tec_mec}
    },
    {
      datosGenerales:"Pulmones / Elevadores Totales - Mecanica",
      labelFormula:"Pulmones / Elevadores Totales - Mecánica",
      indicador:0,
      formula:(valores)=>{return valores.pulmones/valores.ele_tot_mec}
    },
    {
      datosGenerales:"Pulmones / Elevadores Productivos (Elevador + Tecnico)",
      labelFormula:"Pulmones / Elevadores Productivos (Elevador + Tecnico)",
      indicador:0,
      formula:(valores)=>{return valores.pulmones/valores.ele_pro}
    },
    {
      datosGenerales:"Entradas x puesto de trabajo - completo",
      labelFormula:"Entradas promedio taller (6 Meses) / MIN(Elevadores Totales - Mecanica, Tecnicos Mecanicos + Electromecanicos)",
      indicador:0,
      formula:(valores)=>{return valores.ent_pro_tal_6_mes/Math.min(valores.ele_tot_mec, valores.tec_mec)}
    },
    {
      datosGenerales:"Entradas Potenciales x puesto de trabajo - Estandar",
      labelFormula:"Entradas x puestos de trabajo * Elevadores Totales - Mecanica",
      indicador:0,
      formula:(valores)=>{return valores.ent_x_pues_de_tra*valores.ele_tot_mec}
    }
  ];

  private dataMecanica$: BehaviorSubject<any> = new BehaviorSubject<any>(this.dataMecanica);

  constructor() { }

  getColision(){
    return this.dataMecanica$.asObservable();
  }

  setColision(valor){
    return this.dataMecanica$.next(valor);
  }
}
