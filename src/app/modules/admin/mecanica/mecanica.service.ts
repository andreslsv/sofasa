import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface valoresMecanica {
  ent_x_pues_de_tra: string;
  pul_por_pue_tra: number;
  ele_tot_mec: number;
  tec_mec: string;
  ele_pro: string;
  pulmones: string;
  ent_pro_tal_6_mes: string;
  tot_hor_fac: string;
  tot_hor_tra: string;
  tot_hor_dis: string;
  hor_hab_ley: string;
  tie_prod: string;
  pro_hor_fac_por_ent: string;
}

@Injectable({
  providedIn: 'root'
})
export class MecanicaService {

  dataMecanica=[
    {
      nombreVariable:"entradasPuestoTrabajo",
      datosGenerales:"Entradas x puesto de trabajo - completo",
      labelFormula:"(Entradas promedio dia (6 Meses)/(Puestos de trabajo completos)",
      indicador:0,
      formula:(valores)=>{
        return valores.ent_pro_tal_6_mes/Math.min(valores.ele_tot_mec,valores.tec_mec)
      }
    },
    {
      nombreVariable:"aprovechamientoCapacidadServicio",
      datosGenerales:"Aprovechamiento Capacidad Servicio - Puesto completo",
      labelFormula:"(Entradas x puesto de trabajo - completo)/(Entradas x puesto trabajo)",
      indicador:0,
      formula:(valores)=>{
        return (valores.ent_pro_tal_6_mes/Math.min(valores.ele_tot_mec,valores.tec_mec))/valores.ent_x_pues_de_tra
      }
    },
    {
      nombreVariable:"capacidadDeServicioInstalada",
      datosGenerales:"Capacidad de servicio instalada",
      labelFormula:"(Entradas promedio taller (6 Meses)) / ((Elevadores totales - Mecanica )* (Entradas x puesto trabajo ))",
      indicador:0,
      formula:(valores)=>{
        return valores.ent_pro_tal_6_mes/(valores.ele_tot_mec*valores.ent_x_pues_de_tra)
      }
    },
    {
      nombreVariable:"tasaEmpleo",
      datosGenerales:"Tasa Empleo",
      labelFormula:"(Total Horas Trabajadas) / (Total Horas disponibles)",
      indicador:0,
      formula:(valores)=>{
        return valores.tot_hor_tra/valores.tot_hor_dis
      }
    },
    {
      nombreVariable:"tasaEficiencia",
      datosGenerales:"Tasa Eficiencia",
      labelFormula:"(Total Horas Facturadas) / (Total Horas Disponibles)",
      indicador:0,
      formula:(valores)=>{
        return valores.tot_hor_fac/valores.tot_hor_dis
      }
    },
    {
      nombreVariable:"productividad",
      datosGenerales:"Productividad",
      labelFormula:"(Total Horas Facturadas) / (Total Horas Trabajadas)",
      indicador:0,
      formula:(valores)=>{
        return valores.tot_hor_fac/valores.tot_hor_tra
      }
    },
    {
      nombreVariable:"entradasPotenciales",
      datosGenerales:"Entradas Potenciales x puesto de trabajo - Estandar",
      labelFormula:"(Elevadores Totales  - mecanica) * (Entradas x puesto trabajo)",
      indicador:0,
      formula:(valores)=>{
        return valores.ele_tot_mec/valores.ent_x_pues_de_tra
      }
    },
    {
      nombreVariable:"entradasPuestoTrabajo",
      datosGenerales:"Entradas x puesto trabajo",
      labelFormula:"(horas hábiles de ley * Tiempo productivo (habil - muerto )) / (Promedio horas facturacion por entrada)",
      indicador:0,
      formula:(valores)=>{
        return (valores.hor_hab_ley*valores.tie_prod)/valores.pro_hor_fac_por_ent
      }
    },
    {
      nombreVariable:"tecnicosElevadoresTotales",
      datosGenerales:"Tecnicos / Elevadores Totales - Mecanica",
      labelFormula:"Elevadores Totales/Técnicos mecánicos + Electrónica",
      indicador:0,
      formula:(valores)=>{return valores.tec_mec/valores.ele_tot_mec}
    },
    {
      nombreVariable:"pulmonesElevadoresTotales",
      datosGenerales:"Pulmones / Elevadores Totales - Mecanica",
      labelFormula:"Pulmones / Elevadores Totales - Mecánica",
      indicador:0,
      formula:(valores)=>{return valores.pulmones/valores.ele_tot_mec}
    },
    {
      nombreVariable:"pulmonesElevadoresProductivos",
      datosGenerales:"Pulmones / Elevadores Productivos (Elevador + Tecnico)",
      labelFormula:"Pulmones / Elevadores Productivos (Elevador + Tecnico)",
      indicador:0,
      formula:(valores)=>{return valores.pulmones/Math.min(valores.ele_tot_mec, valores.tec_mec)}
    }
  ];

  private dataMecanica$: BehaviorSubject<any> = new BehaviorSubject<any>(this.dataMecanica);

  constructor() { }

  getMecanica(){
    return this.dataMecanica$.asObservable();
  }

  setMecanica(valor){
    return this.dataMecanica$.next(valor);
  }
}
