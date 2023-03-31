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
  //@ViewChild("chart") chart: ChartComponent;

  public chartOptionsEstandar: Partial<ChartOptions>;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  
  //Valores para llenar las tablas
  chartOptions: Partial<ChartOptions>;
  configEstandarElevador: Partial<ChartOptions>;
  configEficiencia: Partial<ChartOptions>;


  dataIndicadores:any;
  usuario: User;
  apiDataUbicacion: any;
  apiDataDashboard: any;

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
    //chip.toggleSelected(true);
    if (selector.includes(chip.value)) {
      selector.splice(selector.indexOf(chip.value), 1);
    } else {
      selector.push(chip.value);
    }
  }

  generarDataPuestoCompleto(){
    let elemento = [];

    elemento = this.zonasDisponibles.map((element)=>{
      return {zona:element, valor:0}
    });

    this.apiDataDashboard.forEach((element) => {
      elemento.forEach((element2)=>{
        if (element.zona==element2.zona) {
          element2.valor+=element.aprovechamientoCapacidadServicio;
        }
      });
    });

    elemento=elemento.map((data)=>{
      return data.valor;
    });

    this.chartOptions.series[0].data=elemento;
    this.chartOptions.xaxis={
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
    
    this._dashBoardService.setConfigPuestoCompleto(this.chartOptions);
  }

  
  async generarDataEstandarElevador(){
    let elemento = [];

    elemento = this.zonasDisponibles.map((element)=>{
      return {zona:element, valor:0}
    });

    console.log("this.apiDataDashboard =>",this.apiDataDashboard);

    this.apiDataDashboard.forEach((element) => {
      elemento.forEach((element2)=>{
        if (element.zona==element2.zona) {
          element2.valor+=element.pulmonesElevadoresProductivos;//El valor debe ser la sumatoria de elevadoresProductivos
        }
      });
    });

    elemento=elemento.map((data)=>{
      return data.valor;
    });

    this.configEstandarElevador.series[0].data=elemento;
    this.configEstandarElevador.xaxis.categories= await this.zonasDisponibles.map((data)=>{return data!=null?data:'zona ej'});
    this._dashBoardService.setConfigEstandarElevador(this.configEstandarElevador);
  }

  generarDataIndicadores(){
    let elemento = valoresIndicadoresDefault;

    this.apiDataDashboard.forEach((data)=>{
      elemento[0].valor+=data.productividad;
      elemento[1].valor+=data.tasaEficiencia;
      elemento[2].valor+=data.tasaEmpleo;
      elemento[3].valor+=data.puestosDeTrabajoCompletos;
      elemento[4].valor+=data.tecnicosElevadoresTotales;
      elemento[5].valor+=data.pulmonesElevadoresTotales;
      elemento[6].valor+=data.puestosDeTrabajoCompletos;
      elemento[7].valor+=data.elevadoresTotalesMecanica;
      elemento[8].valor+=data.elevadoresTotalesMecanica;
      elemento[9].valor+=data.entradasPuestoTrabajo;
    });

    this._dashBoardService.setIndicadores(elemento);
  }

  obtenerApiDataUbicacion(){
    const zonasDisponibles = this.usuario?.ubicacion.map((data)=>{return data.zona});
    const regionesDisponibles = this.usuario?.ubicacion.map((data)=>{return data.region});
    const sociedadesDisponibles = this.usuario?.ubicacion.map((data)=>{return data.sociedad});
    const sedesDisponibles = this.usuario?.ubicacion.map((data)=>{return data.sede});
    this._dashBoardService.setApiDataUbicacion({region:regionesDisponibles,sede:sedesDisponibles,sociedad:sociedadesDisponibles,zona:zonasDisponibles});
  }

  seleccionarSeccion(indice){
    const nodo = ["Mecanica/ConsultarMecanica","Colision/ConsultarColision"];
    this._apiService.postQuery(nodo[indice],"",this.paramsDefault).subscribe(async(data:any)=>{
      await this._dashBoardService.setApiDataDashboard(data?.result);
      await this.agregarFiltros();
      await this.cargarDataDeGraficos();
    });
  }

  cargarDataDeGraficos(){
    this.generarDataPuestoCompleto();
    this.generarDataEstandarElevador();
    this.generarDataIndicadores();
  }

  agregarFiltros(){
    this.filtrarPorZona();
    this.filtrarPorRegion();
    this.filtrarPorSede();
    this.filtrarPorSociedad();
  }

  filtrarPorZona(){
    const dataFiltradaPorZona=this.apiDataDashboard.filter((data)=>{return this.zonasDisponibles.includes(data.zona)});
  }

  filtrarPorRegion(){
    const dataFiltradaPorRegion=this.apiDataDashboard.filter((data)=>{return this.regionesDisponibles.includes(data.region)});
  }

  filtrarPorSede(){
    const dataFiltradaPorSede=this.apiDataDashboard.filter((data)=>{return this.sedesDisponibles.includes(data.sede)});
  }

  filtrarPorSociedad(){
    const dataFiltradaPorSociedad=this.apiDataDashboard.filter((data)=>{return this.sociedadesDisponibles.includes(data.sociedad)});
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
