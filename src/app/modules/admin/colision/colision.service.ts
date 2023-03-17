import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColisionService {

  dataMecanica=[
    {
      datosGenerales:"Entradas por puestos de trabajo",
      labelFormula:"Total horas trabajadas / Total horas disponibles",
      indicador:0,
      formula:(valores)=>{return (valores.hor_hab_ley/valores.tie_pro)/valores.pro_hor_fac_por_ent}
    },
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
      formula:(valores)=>{return valores.pul_por_pue_tra/((valores.hor_hab_ley/valores.tie_pro)/valores.pro_hor_fac_por_ent)}
    },
    {
      datosGenerales:"Capacidad de servicio instalada",
      labelFormula:"Entradas Promedio Taller / (Elevadores Totales - Mecánida*Entradas x Puestos de trabajo",
      indicador:0,
      formula:(valores)=>{return valores.ent_pro_tal/(valores.ele_tot_mec*valores.ent_x_pues_de_tra)}
    },
    /*-----------------------FALTANDO-----------------------------*/
    {
      datosGenerales:"Tecnicos / Puestos de trabajo",
      labelFormula:"Elevadores Totales/Técnicos mecánicos + Electrónica",
      indicador:0,
      formula:(valores, valoresPuestosTrabajo)=>{return valores.ele_tot_mec/valores.tec_mec}
    },
    {
      datosGenerales:"Pulmones / Puesto de trabajo",
      labelFormula:"Pulmones / Elevadores Totales - Mecánica",
      indicador:0,
      formula:(valores)=>{return valores.pulmones/valores.ele_tot_mec}
    },
    {
      datosGenerales:"Pulmones / Puesto de trabajo completo (puesto + técnico)",
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
    /*-----------------------FALTANDO-----------------------------*/
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
