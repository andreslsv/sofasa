import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatChip } from '@angular/material/chips/chip';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { ApiService } from 'app/services/api.service';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexGrid, ApexPlotOptions, ApexTitleSubtitle, ApexXAxis, ApexYAxis, ChartComponent } from 'ng-apexcharts';
import { Subject, takeUntil } from 'rxjs';
import { DashboardColisionService } from './dashboard-colision.service';
import { valoresIndicadoresDefault } from './graficos';
import { saveAs } from 'file-saver';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  selector: 'app-dashboard-colision',
  templateUrl: './dashboard-colision.component.html',
  styleUrls: ['./dashboard-colision.component.scss']
})
export class DashboardColisionComponent implements OnInit {
  @ViewChild("GpuestoCompleto") GpuestoCompleto: ChartComponent;
  @ViewChild("GEstandarElevador") GEstandarElevador: ChartComponent;
  @ViewChild("GEficiencia") GEficiencia: ChartComponent;
  @ViewChild("GProductividad") GProductividad: ChartComponent;
  @ViewChild("GEntradas") GEntradas: ChartComponent;

  public chartOptionsEstandar: Partial<ChartOptions>;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  
  //Valores para llenar las tablas
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
  seleccionado: any;

  constructor(private _formBuilder: FormBuilder, private _dashBoardService:DashboardColisionService, private _apiService:ApiService, private _userService:UserService,private _snackBar: MatSnackBar) {}


  toggleSelection(chip: MatChip,selector,funcionActualizar=null) {
    //chip.toggleSelected(true);
    if (selector.includes(chip.value)) {
      selector.splice(selector.indexOf(chip.value), 1);
    } else {
      selector.push(chip.value);
    }

    if (funcionActualizar) {
      funcionActualizar(selector);
    }
  }

  actualizarZonasSeleccionados=(valor)=>{
    let sel=this.seleccionado;
    sel.zonasSelesccionadas=valor;
    this._dashBoardService.setSeleccionados(sel);
  }

  actualizarRegionesSeleccionadas=(valor)=>{
    let sel=this.seleccionado;
    sel.regionesSeleccionadas=valor;
    this._dashBoardService.setSeleccionados(sel);
  }

  actualizarSociedadesSeleccionadas=(valor)=>{
    let sel=this.seleccionado;
    sel.sociedadesSeleccionadas=valor;
    this._dashBoardService.setSeleccionados(sel);
  }

  actualizarSedesSeleccionadas=(valor)=>{
    let sel=this.seleccionado;
    sel.sedesSeleccionadas=valor;
    this._dashBoardService.setSeleccionados(sel);
  }

  generarDataPuestoCompleto(filtros=null){
    let elemento = [];
    const zonasDisponibles = filtros?.zonas?filtros.zonas:this.zonasDisponibles;
    const apiDataDashboard = filtros?.apiDataDashboard?filtros.apiDataDashboard:this.apiDataDashboard;

    elemento = zonasDisponibles.map((element)=>{
      return {zona:element, valor:0, productividad:0, tasaEficiencia:0, tasaEmpleo:0, pulmonesPorPuestoTrabajo:0, tecnicosPuestoTrabajo:0, pulmones:0, puestosDeTrabajoCompletos:0, puestoTrabajoDefinidoMarca:0, entradasPromedioTaller:0, entradasPuestoTrabajo:0}
    });

    apiDataDashboard.forEach((element) => {
      console.log("El this.apiDataDashboard de", element);
      elemento.forEach((element2)=>{
        console.log("element",element);
        console.log("element2",element2);
        if (element.zona==element2.zona) {
          element2.valor+=element.aprovechamientoCapacidadServicio;
          element2.productividad+=element.productividad;
          element2.tasaEficiencia+=element.tasaEficiencia;
          element2.tasaEmpleo+=element.tasaEmpleo;
          element2.pulmonesPorPuestoTrabajo+=element.pulmonesPorPuestoTrabajo;
          element2.pulmones+=element.pulmones;
          element2.puestosDeTrabajoCompletos+=element.puestosDeTrabajoCompletos;
          element2.puestoTrabajoDefinidoMarca+=element.puestoTrabajoDefinidoMarca;
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
          element2.valor+=element.puestosDeTrabajoCompletos;
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
          element2.valor+=element.entradasxPuestoTrabajo;//Valor quemado pulmonesElevadoresProductivos es el original
        }
      });
    });

    apiDataDashboard.forEach((element) => {
      elemento2.forEach((element2)=>{
        if (element.zona==element2.zona) {
          element2.valor+=element.entradasPotencialesPuestoTrabajo;//Valor quemado pulmonesElevadoresProductivos es el original
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



  async generarDataEntradas(){
    /*let elemento = [];

    elemento = this.zonasDisponibles.map((element)=>{
      return {zona:element, valor:0}
    });

    console.log("this.apiDataDashboard =>",this.apiDataDashboard);

    this.apiDataDashboard.forEach((element) => {
      elemento.forEach((element2)=>{
        if (element.zona==element2.zona) {
          element2.valor+=element.entradasPuestoTrabajo;
        }
      });
    });

    elemento=elemento.map((data)=>{
      return data.valor;
    });

    this.configEntradas.series[0].data=elemento;
    this.configEntradas.xaxis={
      categories: this.zonasDisponibles.map((data)=>{return data!=null?data:'zona ej'}),
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
    }
    this._dashBoardService.setConfigProductividad(this.configEntradas);*/
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
      elemento[3].valor+=data.pulmonesPorPuestoTrabajo;
      elemento[4].valor+=data.tecnicosPuestoTrabajo;
      elemento[5].valor+=data.pulmones;//Igual en mecanica
      elemento[6].valor+=data.puestosDeTrabajoCompletos;
      elemento[7].valor+=data.puestoTrabajoDefinidoMarca;
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
      //await this.agregarFiltros();
      await this.cargarDataDeGraficos();
    });
  }

  cargarDataDeGraficos(){
    this.generarDataPuestoCompleto();
    this.generarDataEstandarElevador();
    this.generarDataIndicadores();
    this.generarDataEficiencia();
    this.generarDataProductividad();
    this.generarDataEntradas();
    this.generarDataEntradasActuales();
  }

  agregarFiltros(){
    this.filtrarPorZona();
    this.filtrarPorRegion();
    this.filtrarPorSede();
    this.filtrarPorSociedad();
  }

  filtrarPorZona(){
    this.generarDataProductividad({zonas:this.zonasSelesccionadas});
    this.generarDataPuestoCompleto({zonas:this.zonasSelesccionadas});
    this.generarDataEstandarElevador({zonas:this.zonasSelesccionadas});
    this.generarDataEficiencia({zonas:this.zonasSelesccionadas});
    this.generarDataEntradasActuales({zonas:this.zonasSelesccionadas});
  }

  filtrarPorRegion(){
    //const dataFiltradaPorRegion=this.apiDataDashboard.filter((data)=>{return this.regionesDisponibles.includes(data.region)});
    //this.aplicarFiltroRegiones();
  }

  filtrarPorSede(){
    const dataFiltradaPorSede=this.apiDataDashboard.filter((data)=>{return this.sedesDisponibles.includes(data.sede)});
  }

  filtrarPorSociedad(){
    let copia=this.apiDataDashboard;
    const dataFiltradaPorSociedad=copia.filter((data)=>{return this.sociedadesDisponibles.includes(data.sociedad)});
    this.generarDataPuestoCompleto(dataFiltradaPorSociedad);
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

    //this._dashBoardService.setApiDataDashboard(filtrado);
    this.generarDataIndicadores(filtrado);
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

    //this._dashBoardService.setApiDataDashboard(filtrado);
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

    //this._dashBoardService.setApiDataDashboard(filtrado);
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

  saveDataToCSV(data: any[], filename: string) {
    // Convierte los datos en una cadena CSV
    const csvData = this.convertToCSV(data);
  
    // Crea un objeto Blob con la cadena CSV
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
  
    // Utiliza file-saver para descargar el archivo CSV
    saveAs(blob, filename);
  }
  
  convertToCSV(data: any[]) {
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(obj => Object.values(obj).join(','));
    return `${headers}\n${rows.join('\n')}`;
  }

  guardarDataCsv(){
    const nodo = ["Mecanica/ConsultarMecanica","Colision/ConsultarColision"];

    this._apiService.postQuery(nodo[1],"",this.paramsDefault).subscribe(async(data:any)=>{
      const dataFiltrada = this.filtrarDataCSV(data.result);

      if (dataFiltrada.length>0) {
        this.saveDataToCSV(dataFiltrada,"dashboard");
      }else{
        this.openSnackBar("Nada para guardar");
      }

    });
 
  }

  openSnackBar(mensaje){
    this._snackBar.open(mensaje, null, {duration: 4000});
  }

  filtrarDataCSV(dashboard){
    let personasFiltradas = dashboard;

    if (this.seleccionado?.regionesSeleccionadas) {
      personasFiltradas = personasFiltradas.filter(dash => this.seleccionado.regionesSeleccionadas.includes(dash.region));
    }

    if (this.seleccionado?.zonasSelesccionadas) {
      personasFiltradas = personasFiltradas.filter(dash => this.seleccionado.zonasSelesccionadas.includes(dash.zona));
    }

    if (this.seleccionado?.sociedadesSeleccionadas) {
      personasFiltradas = personasFiltradas.filter(dash => this.seleccionado.sociedadesSeleccionadas.includes(dash.sociedad));
    }

    if (this.seleccionado?.sedesSeleccionadas) {
      personasFiltradas = personasFiltradas.filter(dash => this.seleccionado.sedesSeleccionadas.includes(dash.sede));
    }
    
    return personasFiltradas;
  }

  ngOnInit(): void {

    this._dashBoardService.getApiDataUbicacion().subscribe(async(data)=>{
      //this.apiDataUbicacion = await data;
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
      console.log("ChartOptions ha cambiado", await data);
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

    this._dashBoardService.getSeleccionado().subscribe((data)=>{
      this.seleccionado = data;
    });

    this._userService.user$
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(async(user: User) => {
        this.usuario = await user;
        //this._changeDetectorRef.markForCheck();
        //await this._dashBoardService.setApiDataUbicacion(this.usuario.ubicacion);
        await this.obtenerApiDataUbicacion();
        await this.seleccionarSeccion(1);
        //await this.obtenerApiDataUbicacion();
    });

  }

}
