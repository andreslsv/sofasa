import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColisionService {

  puestos_de_trabajo_definidos_por_marca(valores2){
    return valores2.ej_puesto_desarmado+valores2.ej_puesto_latoneria+valores2.ej_puesto_preparacion+valores2.ej_cabina_pintura+valores2.ej_puesto_brillado;
  }

  persona_productivo(valores2){
    return valores2.tec_puesto_desarmado+valores2.tec_puesto_latoneria+valores2.tec_puesto_preparacion+valores2.tec_cabina_pintura+valores2.tec_puesto_brillado;
  }

  entradas_por_puestos_de_trabajo(valores){
    return (valores.hor_hab_ley*valores.tie_pro)/valores.pro_hor_fac_por_ent;
  }

  dataMecanica=[
    {
      nombreVariable:"entradasxPuestoTrabajo",
      datosGenerales:"Entradas x puesto de trabajo - completo",
      labelFormula:"(Entradas promedio dia (6 Meses)) / (Puestos de trabajo completos)",
      indicador:0,
      formula:(valores,valores2)=>{
        return (valores.ent_pro_tal)/Math.min(this.puestos_de_trabajo_definidos_por_marca(valores2),this.persona_productivo(valores2))}
    },
    {
      nombreVariable:"aprovechamientoCapacidadServicio",
      datosGenerales:"Aprovechamiento Capacidad Servicio - Puesto completo",
      labelFormula:"(Entradas x puesto de trabajo - completo) / (Entradas x puesto trabajo)",
      indicador:0,
      formula:(valores,valores2)=>{return (valores.hor_hab_ley*valores.tie_pro)/valores.pro_hor_fac_por_ent}
    },
    {
      nombreVariable:"capacidadServicioInstalada",
      datosGenerales:"Capacidad de servicio instalada",
      labelFormula:"(Entradas promedio taller (6 Meses)) / ((Elevadores totales - Mecanica )* (Entradas x puesto trabajo ))",
      indicador:0,
      //formula:(valores)=>{return valores.ent_pro_tal/}
      formula:(valores,valores2)=>{return 0}
    },
    {
      nombreVariable:"tasaEmpleo",
      datosGenerales:"Tasa Empleo",
      labelFormula:"(Total Horas Trabajadas) / (Total Horas disponibles)",
      indicador:0,
      formula:(valores,valores2)=>{return valores.tot_hor_tra/valores.tot_hor_dis}
    },
    {
      nombreVariable:"tasaEficiencia",
      datosGenerales:"Tasa Eficiencia",
      labelFormula:"(Total Horas Facturadas) / (Total Horas Disponibles)",
      indicador:0,
      formula:(valores,valores2)=>{return valores.tot_hor_fac/valores.tot_hor_dis}
    },
    {
      nombreVariable:"productividad",
      datosGenerales:"Productividad",
      labelFormula:"(Total Horas Facturadas) / (Total Horas Trabajadas)",
      indicador:0,
      formula:(valores,valores2)=>{return valores.tot_hor_fac/valores.tot_hor_tra}
    },
    {
      nombreVariable:"entradasPotencialesPuestoTrabajo",
      datosGenerales:"Entradas Potenciales x puesto de trabajo - Estandar",
      labelFormula:"(Elevadores Totales  - mecanica) * (Entradas x puesto trabajo)",
      indicador:0,
      formula:(valores,valores2)=>{return valores.tot_hor_fac/valores.tot_hor_tra}
    },
    {
      nombreVariable:"puestoTrabajoDefinidoMarca",
      datosGenerales:"Puestos de trabajo definidos por marca",
      labelFormula:"Sumatoria de puestos definidos por marca",
      indicador:0,
      formula:(valores,valores2)=>{return this.puestos_de_trabajo_definidos_por_marca(valores2)}
    },
    {
      nombreVariable:"personaProductivo",
      datosGenerales:"Persona productivo",
      labelFormula:"Sumatoria de puestos definidos por consecionario",
      indicador:0,
      formula:(valores,valores2)=>{return this.persona_productivo(valores2)}
    },
    {
      nombreVariable:"puestosDeTrabajoCompletos",
      datosGenerales:"Puestos de trabajo completos (productivos)",
      labelFormula:"Min(Persona productivo, Puestos de trabajo definidos por marca)",
      indicador:0,
      formula:(valores,valores2)=>{return Math.min(this.puestos_de_trabajo_definidos_por_marca(valores2),this.persona_productivo(valores2))}
    },
    {
      nombreVariable:"entradasxPuestoTrabajo",
      datosGenerales:"Entradas por puestos de trabajo",
      labelFormula:"Total horas trabajadas / Total horas disponibles",
      indicador:0,
      formula:(valores,valores2)=>{return this.entradas_por_puestos_de_trabajo(valores)}
    },
    {
      nombreVariable:"pulmonesPuestoTrabajo",
      datosGenerales:"Pulmones / Puesto de trabajo",
      labelFormula:"pulmones / Puestos de trabajo definidos por marca",
      indicador:0,
      formula:(valores,valores2)=>{return valores.pulmones/this.puestos_de_trabajo_definidos_por_marca(valores2)}
    },
    {
      nombreVariable:"capacidadServicioInstalada",
      datosGenerales:"Capacidad de servicio instalada preguntar dos formulas",
      labelFormula:"Entradas promedio taller (6 Meses) / (puesto trabajo definido por marca*Entradas por puestos de trabajo)",
      indicador:0,
      formula:(valores, valores2)=>{return valores.ent_pro_tal/(this.puestos_de_trabajo_definidos_por_marca(valores2)*this.entradas_por_puestos_de_trabajo(valores))}
    },
    {
      nombreVariable:"tecnicosPuestoTrabajo",
      datosGenerales:"Tecnicos / puestos trabajo",
      labelFormula:"Total horas trabajadas / Total horas disponibles",
      indicador:0,
      formula:(valores,valores2)=>{return this.persona_productivo(valores2)/this.entradas_por_puestos_de_trabajo(valores)}
    },
    {
      nombreVariable:"pulmonesPuestoTrabajo",
      datosGenerales:"Pulmones / Puesto de trabajo",
      labelFormula:"Pulmones / Puestos de trabajo definidos por marca",
      indicador:0,
      formula:(valores,valores2)=>{return valores.pulmones/this.puestos_de_trabajo_definidos_por_marca(valores2) }
    },
    {
      nombreVariable:"pulmonesPuestoTrabajoCompleto",
      datosGenerales:"Pulmones / Puesto de trabajo completo (puesto + técnico)",
      labelFormula:"Pulmones / Puestos de trabajo definidos por marca",
      indicador:0,
      formula:(valores,valores2)=>{return valores.pulmones/Math.min(this.puestos_de_trabajo_definidos_por_marca(valores2),this.persona_productivo(valores2)) }
    },
    {
      nombreVariable:"puestosDeTrabajoCompletos",
      datosGenerales:"Puestos de trabajo - completos",
      labelFormula:"Min(Puestos de trabajo definidos por marca, Persona productivo)",
      indicador:0,
      formula:(valores, valores2)=>{return Math.min(this.persona_productivo(valores2),this.entradas_por_puestos_de_trabajo(valores)) }
    },
    {
      nombreVariable:"puestosDeTrabajoTotales",
      datosGenerales:"Puestos de trabajo totales",
      labelFormula:"Puestos de trabajo definidos por marca",
      indicador:0,
      formula:(valores, valores2)=>{return this.puestos_de_trabajo_definidos_por_marca(valores2)}
    },
    {
      nombreVariable:"entradasPotencialesPuestoTrabajo",
      datosGenerales:"Entradas Potenciales x puesto de trabajo - Estandar",
      labelFormula:"puestos de trabajo definidos por marca*entradas por puestos de trabajo",
      indicador:0,
      formula:(valores,valores2)=>{return this.puestos_de_trabajo_definidos_por_marca(valores2)*this.entradas_por_puestos_de_trabajo(valores)}
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
