import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatChip } from '@angular/material/chips/chip';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { ApiService } from 'app/services/api.service';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexGrid, ApexPlotOptions, ApexTitleSubtitle, ApexXAxis, ApexYAxis, ChartComponent } from 'ng-apexcharts';
import { Subject, takeUntil } from 'rxjs';
import { DashboardService } from './dashboard.service';
import { valoresIndicadoresDefault } from './graficos';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  grid:ApexGrid;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild("GpuestoCompleto") GpuestoCompleto: ChartComponent;
  @ViewChild("GEstandarElevador") GEstandarElevador: ChartComponent;
  @ViewChild("GEficiencia") GEficiencia: ChartComponent;
  @ViewChild("GProductividad") GProductividad: ChartComponent;
  @ViewChild("GEntradas") GEntradas: ChartComponent;

  public chartOptionsEstandar: Partial<ChartOptions>;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  chartOptions: Partial<ChartOptions>;
  configEstandarElevador: Partial<ChartOptions>;
  configEficiencia: Partial<ChartOptions>;
  configProductividad: Partial<ChartOptions>;
  configEntradas: Partial<ChartOptions>;

  dataIndicadores:any;
  usuario: User;
  apiDataUbicacion: any;
  apiDataDashboard: any;
  apiDataDashboardBackup:any;

  regionesDisponibles=[];
  zonasDisponibles=[];
  sociedadesDisponibles=[];
  sedesDisponibles=[];
  zonasSelesccionadas=[];
  regionesSeleccionadas=[];
  sociedadesSeleccionadas=[];
  sedesSeleccionadas=[];
  displayedColumns: string[] = ['position', 'name'];
  chartOptions2: { series: number[]; colors: string[]; stroke:{width:number}; chart: { width: number; type: string; }; labels: string[]; responsive: { breakpoint: number; options: { chart: { width: number; }; legend: { position: string; show:boolean; }; }; }[]; };
  secciones=["Mecánica","Colisión"];

  paramsDefault={"empresa": "","ultimoReg": "1","fechaIni": "2023-03-23T14:29:27.803Z","fechaFin": "2023-03-23T14:29:27.803Z"};

  seccionForm = this._formBuilder.group({
    region                : [, [Validators.required]],
    zona                  : [, [Validators.required]],
    sociedad              : [, [Validators.required]],
    sede                  : [, [Validators.required]],
  });

  constructor(private _formBuilder: FormBuilder, private _dashBoardService:DashboardService, private _apiService:ApiService, private _userService:UserService) {}


  toggleSelection(chip: MatChip,selector) {
    if (selector.includes(chip.value)) {
      selector.splice(selector.indexOf(chip.value), 1);
    } else {
      selector.push(chip.value);
    }
  }

  generarDataPuestoCompleto(filtros=null){
    let elemento = [];
    const zonasDisponibles = filtros?.zonas?filtros.zonas:this.zonasDisponibles;
    const apiDataDashboard = filtros?.apiDataDashboard?filtros.apiDataDashboard:this.apiDataDashboard;

    elemento = zonasDisponibles.map((element)=>{
      return {zona:element, valor:0, productividad:0, tasaEficiencia:0, tasaEmpleo:0, puestosDeTrabajoCompletos:0,tecnicosElevadoresTotales:0,pulmonesElevadoresTotales:0,capacidadDeServicioInstalada:0, elevadoresTotalesMecanica:0, entradasPromedioTaller:0, entradasPuestoTrabajo:0}
    });

    apiDataDashboard.forEach((element) => {
      elemento.forEach((element2)=>{
        if (element.zona==element2.zona) {
          element2.valor+=element.aprovechamientoCapacidadServicio;
          element2.productividad+=element.productividad;
          element2.tasaEficiencia+=element.tasaEficiencia;
          element2.tasaEmpleo+=element.tasaEmpleo;
          element2.puestosDeTrabajoCompletos+=element.puestosDeTrabajoCompletos;
          element2.tecnicosElevadoresTotales+=element.tecnicosElevadoresTotales;
          element2.pulmonesElevadoresTotales+=element.pulmonesElevadoresTotales;
          element2.capacidadDeServicioInstalada+=element.capacidadDeServicioInstalada;
          element2.elevadoresTotalesMecanica+=element.elevadoresTotalesMecanica;
          element2.entradasPromedioTaller+=element.entradasPromedioTaller;
          element2.entradasPuestoTrabajo+=element.entradasPuestoTrabajo;
        }
      });
    });

    let elementoParaIndicadores = elemento;
    this.generarDataIndicadores(elementoParaIndicadores);

    elemento=elemento.map((data)=>{
      return data.valor.toFixed(2);
    });

    this.GpuestoCompleto.updateOptions({
      xaxis: {categories: zonasDisponibles.map((data)=>{return data!=null?data:'zona ej'})},
      series: [{data:elemento}]
    });
    
    this._dashBoardService.setConfigPuestoCompleto(this.chartOptions);
  }

  
  async generarDataEstandarElevador(filtros=null){
    let elemento = [];
    const zonasDisponibles = filtros?.zonas!=null?filtros.zonas:this.zonasDisponibles;
    const apiDataDashboard = filtros?.apiDataDashboard?filtros.apiDataDashboard:this.apiDataDashboard;

    elemento = zonasDisponibles.map((element)=>{
      return {zona:element, valor:0}
    });

    apiDataDashboard.forEach((element) => {
      elemento.forEach((element2)=>{
        if (element.zona==element2.zona) {
          element2.valor+=element.elevadoresProductivos;//El valor debe ser la sumatoria de elevadoresProductivos
        }
      });
    });

    elemento=elemento.map((data)=>{
      return data.valor.toFixed(2);
    });

    this.GEstandarElevador.updateOptions({
      xaxis: {categories: zonasDisponibles.map((data)=>{return data!=null?data:'zona ej'})},
      series: [{data:elemento}]
    });

    this._dashBoardService.setConfigEstandarElevador(this.configEstandarElevador);
  }


  async generarDataEficiencia(filtros=null){
    let elemento = [];
    const zonasDisponibles = filtros?.zonas!=null?filtros.zonas:this.zonasDisponibles;
    const apiDataDashboard = filtros?.apiDataDashboard?filtros.apiDataDashboard:this.apiDataDashboard;

    elemento = zonasDisponibles.map((element)=>{
      return {zona:element, valor:0}
    });

    apiDataDashboard.forEach((element) => {
      elemento.forEach((element2)=>{
        if (element.zona==element2.zona) {
          element2.valor+=element.tasaEficiencia;//El valor debe ser la sumatoria de elevadoresProductivos
        }
      });
    });

    elemento=elemento.map((data)=>{
      return data.valor.toFixed(2);
    });

    this.GEficiencia.updateOptions({
      xaxis: {categories: zonasDisponibles.map((data)=>{return data!=null?data:'zona ej'})},
      series: [{data:elemento}]
    });

    this._dashBoardService.setConfigEstandarElevador(this.configEstandarElevador);
  }


  async generarDataProductividad(filtros=null){
    let elemento = [];

    const dataZona=filtros?.zonas?filtros.zonas:this.zonasDisponibles;
    const apiDataDashboard = filtros?.apiDataDashboard?filtros.apiDataDashboard:this.apiDataDashboard;

    elemento = dataZona.map((element)=>{
      return {zona:element, valor:0}
    });

    console.log("Primer momento del elemento", elemento);

    apiDataDashboard.forEach((element) => {
      elemento.forEach((element2)=>{
        if (element.zona==element2.zona) {
          element2.valor+=element.productividad;//El valor debe ser la sumatoria de elevadoresProductivos
        }
      });
    });

    console.log("Segundo momento del elemento", elemento);

    elemento=elemento.map((data)=>{
      return data.valor.toFixed(2);
    });

    console.log("Tercer momento del elemento", elemento);

    this.GProductividad.updateOptions({
      xaxis: {categories: dataZona},
      series: [{data:elemento}]
    });

    this._dashBoardService.setConfigProductividad(this.configProductividad);
  }


  async generarDataEntradasActuales(filtros=null){
    let elemento = [];
    let elemento2 = [];

    const dataZona=filtros?.zonas?filtros.zonas:this.zonasDisponibles;
    const apiDataDashboard=filtros?.apiDataDashboard?filtros.apiDataDashboard:this.apiDataDashboard;

    elemento = dataZona.map((element)=>{
      return {zona:element, valor:0}
    });

    elemento2 = dataZona.map((element)=>{
      return {zona:element, valor:0}
    });

    apiDataDashboard.forEach((element) => {
      elemento.forEach((element2)=>{
        if (element.zona==element2.zona) {
          element2.valor+=element.entradasxPuestoTrabajo;//El valor debe ser la sumatoria de elevadoresProductivos
        }
      });
    });

    apiDataDashboard.forEach((element) => {
      console.log("Elementos de la grafica", element);
      elemento2.forEach((element2)=>{
        console.log("Elementos de la grafica 2", element2);
        if (element.zona==element2.zona) {
          element2.valor+=element.entradasPotenciales;//El valor debe ser la sumatoria de elevadoresProductivos
        }
      });
    });

    elemento=elemento.map((data)=>{
      return data.valor.toFixed(2);
    });

    elemento2=elemento2.map((data)=>{
      return data.valor.toFixed(2);
    });

    this.GEntradas.updateOptions({
      xaxis: {categories: dataZona},
      series: [{data:elemento},{data:elemento2}]
    });

    this._dashBoardService.setConfigEntradas(this.configEntradas);
  }

  reiniciarValoresDataIndicadores(){
    valoresIndicadoresDefault[0].valor=0;
    valoresIndicadoresDefault[1].valor=0;
    valoresIndicadoresDefault[2].valor=0;
    valoresIndicadoresDefault[3].valor=0;
    valoresIndicadoresDefault[4].valor=0;
    valoresIndicadoresDefault[5].valor=0;
    valoresIndicadoresDefault[6].valor=0;
    valoresIndicadoresDefault[7].valor=0;
    valoresIndicadoresDefault[8].valor=0;
    valoresIndicadoresDefault[9].valor=0;
  }

  generarDataIndicadores(dashboard=null){
    const dashBoard = dashboard?dashboard:this.apiDataDashboard;
    this.reiniciarValoresDataIndicadores();
    let elemento = valoresIndicadoresDefault;

    dashBoard.forEach((data)=>{
      elemento[0].valor+=data.productividad;
      elemento[1].valor+=data.tasaEficiencia;
      elemento[2].valor+=data.tasaEmpleo;
      elemento[3].valor+=data.puestosDeTrabajoCompletos;
      elemento[4].valor+=data.tecnicosElevadoresTotales;
      elemento[5].valor+=data.pulmonesElevadoresTotales;
      elemento[6].valor+=data.capacidadDeServicioInstalada;
      elemento[7].valor+=data.elevadoresTotalesMecanica;
      elemento[8].valor+=data.entradasPromedioTaller;
      elemento[9].valor+=data.entradasPuestoTrabajo;
    });

    this._dashBoardService.setIndicadores(elemento);
  }

  obtenerApiDataUbicacion(){
    const zonasDisponibles = this.filtrarElementosDuplicadas(this.usuario?.ubicacion.map((data)=>{return data.zona}));
    const regionesDisponibles = this.filtrarElementosDuplicadas(this.usuario?.ubicacion.map((data)=>{return data.region}));
    const sociedadesDisponibles = this.filtrarElementosDuplicadas(this.usuario?.ubicacion.map((data)=>{return data.sociedad}));
    const sedesDisponibles = this.filtrarElementosDuplicadas(this.usuario?.ubicacion.map((data)=>{return data.sede}));
    this._dashBoardService.setApiDataUbicacion({region:regionesDisponibles,sede:sedesDisponibles,sociedad:sociedadesDisponibles,zona:zonasDisponibles});
  }

  seleccionarSeccion(indice){
    const nodo = ["Mecanica/ConsultarMecanica","Colision/ConsultarColision"];
    this._apiService.postQuery(nodo[indice],"",this.paramsDefault).subscribe(async(data:any)=>{
      await this._dashBoardService.setApiDataDashboard(data?.result);
      await this._dashBoardService.setApiDataDashboardBackup(data?.result);
      await this.cargarDataDeGraficos();
    });
  }

  cargarDataDeGraficos(){
    this.generarDataPuestoCompleto();
    this.generarDataEstandarElevador();
    this.generarDataIndicadores();
    this.generarDataEficiencia();
    this.generarDataProductividad();
    this.generarDataEntradasActuales();
  }

  filtradoAnidado(){
    let filtrado=this.apiDataDashboardBackup;
    let parametros:any;

    if (this.regionesSeleccionadas.length>0) {
      filtrado=this.aplicarFiltroRegiones({anidado:true,dashboard:filtrado});
      console.log("primer filtro", filtrado);
    }

    if (this.sedesSeleccionadas.length>0) {
      filtrado=this.aplicarFiltroSedes({anidado:true,dashboard:filtrado});
      console.log("Segundo filtro", filtrado);
    }

    if (this.sociedadesSeleccionadas.length>0) {
      filtrado=this.aplicarFiltroSociedades({anidado:true,dashboard:filtrado});
      console.log("Tercer filtro", filtrado);
    }

    if (this.zonasSelesccionadas.length>0) {
      parametros={apiDataDashboard:filtrado,zonas:this.zonasSelesccionadas}
    }else{
      parametros={apiDataDashboard:filtrado};
    }

    this.generarDataIndicadores(filtrado);
    this.generarDataPuestoCompleto(parametros);
    this.generarDataEstandarElevador(parametros);
    this.generarDataEficiencia(parametros);
    this.generarDataProductividad(parametros);
    this.generarDataEntradasActuales(parametros);
  }

  aplicarFiltroRegiones(comport=null){
    let filtrado=[];
    let dashBoard = comport?.dashboard ? comport.dashboard : this.apiDataDashboardBackup;

    this.regionesSeleccionadas.forEach((region)=>{
      dashBoard.map((dash)=>{
        if(dash.region==region){
          filtrado.push(dash);
        }
      });
    });
    
    if(comport?.anidado) {
      return filtrado;
    }

    this.generarDataPuestoCompleto({apiDataDashboard:filtrado});
    this.generarDataEstandarElevador({apiDataDashboard:filtrado});
    this.generarDataEficiencia({apiDataDashboard:filtrado});
    this.generarDataProductividad({apiDataDashboard:filtrado});
    this.generarDataEntradasActuales({apiDataDashboard:filtrado});
  }

  aplicarFiltroSedes(comport=null){
    let filtrado=[];
    let dashBoard = comport?.dashboard ? comport.dashboard : this.apiDataDashboardBackup;

    this.sedesSeleccionadas.forEach((sede)=>{
      dashBoard.map((dash)=>{
        if(dash.sede==sede){
          filtrado.push(dash);
        }
      });
    });

    if(comport?.anidado) {
      return filtrado;
    }

    this.generarDataPuestoCompleto({apiDataDashboard:filtrado});
    this.generarDataEstandarElevador({apiDataDashboard:filtrado});
    this.generarDataEficiencia({apiDataDashboard:filtrado});
    this.generarDataProductividad({apiDataDashboard:filtrado});
    this.generarDataEntradasActuales({apiDataDashboard:filtrado});
  }

  aplicarFiltroSociedades(comport=null){
    let filtrado=[];
    let dashBoard = comport?.dashboard ? comport.dashboard : this.apiDataDashboardBackup;

    this.sociedadesSeleccionadas.forEach((sociedad)=>{
      dashBoard.map((dash)=>{
        if(dash.sociedad==sociedad){
          filtrado.push(dash);
        }
      });
    });

    if(comport?.anidado) {
      return filtrado;
    }

    this.generarDataPuestoCompleto({apiDataDashboard:filtrado});
    this.generarDataEstandarElevador({apiDataDashboard:filtrado});
    this.generarDataEficiencia({apiDataDashboard:filtrado});
    this.generarDataProductividad({apiDataDashboard:filtrado});
    this.generarDataEntradasActuales({apiDataDashboard:filtrado});
  }

  resetearValores(){
    this.generarDataPuestoCompleto({apiDataDashboard:this.apiDataDashboardBackup});
    this.generarDataEstandarElevador({apiDataDashboard:this.apiDataDashboardBackup});
    this.generarDataEficiencia({apiDataDashboard:this.apiDataDashboardBackup});
    this.generarDataProductividad({apiDataDashboard:this.apiDataDashboardBackup});
    this.generarDataEntradasActuales({apiDataDashboard:this.apiDataDashboardBackup});
    this.zonasSelesccionadas=[];
    this.regionesSeleccionadas=[];
    this.sociedadesSeleccionadas=[];
    this.sedesSeleccionadas=[];
  }

  filtrarElementosDuplicadas(lista){
    return lista.filter((item, index) => lista.indexOf(item) === index);
  }

  ngOnInit(): void {
    this._dashBoardService.getApiDataUbicacion().subscribe(async(data)=>{
      this.zonasDisponibles=data.zona;
      this.regionesDisponibles=data.region;
      this.sociedadesDisponibles=data.sociedad;
      this.sedesDisponibles=data.sede;
    });

    this._dashBoardService.getApiDataDashboard().subscribe(async(data)=>{
      this.apiDataDashboard = await data;
    });

    this._dashBoardService.getApiDataDashboardBackup().subscribe(async(data)=>{
      this.apiDataDashboardBackup = await data;
    });

    this._dashBoardService.getConfigPuestoCompleto().subscribe(async (data)=>{
      this.chartOptions = await data;
    });

    this._dashBoardService.getConfigEstandarElevador().subscribe(async (data)=>{
      this.configEstandarElevador = await data;
    });

    this._dashBoardService.getConfigEficiencia().subscribe(async (data)=>{
      this.configEficiencia = await data;
    });

    this._dashBoardService.getConfigEntradas().subscribe(async (data)=>{
      this.configEntradas = await data;
    });

    this._dashBoardService.getConfigProductividad().subscribe(async (data)=>{
      this.configProductividad = await data;
    });

    this._dashBoardService.getIndicadores().subscribe(async (data)=>{
      this.dataIndicadores = await data;
    });

    this._userService.user$
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(async(user: User) => {
        this.usuario = await user;
        //this._changeDetectorRef.markForCheck();
        //await this._dashBoardService.setApiDataUbicacion(this.usuario.ubicacion);
        await this.obtenerApiDataUbicacion();
        await this.seleccionarSeccion(0);
        //await this.obtenerApiDataUbicacion();
    });

  }

}
