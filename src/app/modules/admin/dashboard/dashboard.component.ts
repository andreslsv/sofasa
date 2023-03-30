import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatChip } from '@angular/material/chips/chip';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { ApiService } from 'app/services/api.service';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexGrid, ApexPlotOptions, ApexTitleSubtitle, ApexXAxis, ApexYAxis, ChartComponent } from 'ng-apexcharts';
import { Subject, takeUntil } from 'rxjs';
import { DashboardService } from './dashboard.service';
import { valoresGraficosDefault, valoresIndicadoresDefault } from './graficos';

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
  @ViewChild("chart") chart: ChartComponent;

  public chartOptionsEstandar: Partial<ChartOptions>;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  chartOptions: Partial<ChartOptions>;
  dataIndicadores:any;
  usuario: User;
  apiDataUbicacion: any;
  apiDataDashboard: any;
  dataEficiencia: any;

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
  zonas=[];

  paramsDefault={"empresa": "","ultimoReg": "1","fechaIni": "2023-03-23T14:29:27.803Z","fechaFin": "2023-03-23T14:29:27.803Z"};
  dataEstandarElevadorProductivo = [{name: "Valor",data: [],color:"#efdf00"}];

  seccionForm = this._formBuilder.group({
    region                : [, [Validators.required]],
    zona                  : [, [Validators.required]],
    sociedad              : [, [Validators.required]],
    sede                  : [, [Validators.required]],
  });

  constructor(private _formBuilder: FormBuilder, private _dashBoardService:DashboardService, private _apiService:ApiService, private _userService:UserService) {}

  obtenerValoresEstandarxElevadores(){
    this.chartOptionsEstandar = {
      grid:{
        show:true,
        borderColor:"#fff",
        strokeDashArray: 5,
        xaxis: {
          lines: {
              show: true,
              //offsetX: 60,
              //offsetY: 60
          }
        },
        yaxis: {
            lines: {
                show: true,
                //offsetX: 60,
                //offsetY: 60
            }
        },
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }
      },
      series: [
        {
          name: "Valor",
          data: [],//Estos son los valores
          color:"#efdf00"
        }
      ],
      chart: {
        height: 350,
        width:"100%",
        type: "bar"
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: "top" // top, center, bottom
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function(val) {
          return val + "%";
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#fff"]
        }
      },
      xaxis: {
        categories: this.zonasDisponibles.map((data)=>{return data!=null?data:'zona ej'}),//Estas son las etiquetas que se muestran
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
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "horizontal",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [50, 0, 100, 100]
        }
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          show: false,
          formatter: function(val) {
            return val + "%";
          }
        }
      }
    };
  }

  toggleSelection(chip: MatChip,selector) {
    //chip.toggleSelected(true);
    if (selector.includes(chip.value)) {
      selector.splice(selector.indexOf(chip.value), 1);
    } else {
      selector.push(chip.value);
    }
 }

  async obtenerValoresPuestoCompleto(){
    this.chartOptions = {
      grid:{
        show:true,
        borderColor:"#fff",
        strokeDashArray: 5,
        xaxis: {
          lines: {
              show: true,
              //offsetX: 60,
              //offsetY: 60
          }
        },
        yaxis: {
            lines: {
                show: true,
                //offsetX: 60,
                //offsetY: 60
            }
        },
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }
      },
      series: [
        {
          name: "Valor",
          data: [],
          color:"#efdf00"
        }
      ],
      chart: {
        height: 350,
        width:"100%",
        type: "bar"
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: "top" // top, center, bottom
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function(val) {
          return val + "%";
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#fff"]
        }
      },
      xaxis: {
        categories: await this.zonasDisponibles.map((data)=>{return data!=null?data:'zona ej'}),//Estas son las etiquetas que se muestran
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
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "horizontal",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [50, 0, 100, 100]
        }
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          show: false,
          formatter: function(val) {
            return val + "%";
          }
        }
      }
    };
  }

  
  generarDataPuestoCompleto(){

    let elemento = [];
    let elementoEstandar = [];

    //Extraer las zonas desde la api
    elemento = this.zonasDisponibles.map((element)=>{
      return {zona:element, valor:0}
    });

    elementoEstandar = this.zonasDisponibles.map((element)=>{
      return {zona:element, valor:0}
    });

    //Cruzar los valores con las zonas de la api
    this.apiDataDashboard.forEach((element) => {
      elemento.forEach((element2)=>{
        if (element.zona==element2.zona) {
          element2.valor+=element.aprovechamientoCapacidadServicio;
        }
      });
    });


    this.apiDataDashboard.forEach((element) => {
      elementoEstandar.forEach((element2)=>{
        if (element.zona==element2.zona) {
          element2.valor+=element.elevadoresProductivos;
        }
      });
    });

    elemento=elemento.map((data)=>{
      return data.valor;
    });

    elementoEstandar=elementoEstandar.map((data)=>{
      return data.valor;
    });

    //this._dashBoardService.setPuestoCompleto(elemento);
    //this._dashBoardService.setEstandarElevadorProductivo(elementoEstandar);
    //this.obtenerValoresEstandarxElevadores();
    //this.obtenerValoresPuestoCompleto();
    //this.generarDataEficiencia();

    console.log("Este es el valor de elemento", elemento);

    this.chartOptions.series[0].data=elemento;
    this._dashBoardService.setConfigPuestoCompleto(this.chartOptions);
  }

  generarDataEficiencia(){
    let elemento = [];

    //Extraer las zonas desde la api
    elemento = this.zonasDisponibles.map((element)=>{
      return {zona:element, valor:0}
    });

    //Cruzar los valores con las zonas de la api
    this.apiDataDashboard.forEach((element) => {
      elemento.forEach((element2)=>{
        if (element.zona==element2.zona) {
          element2.valor+=element.tasaEficiencia;
        }
      });
    });

    elemento=elemento.map((data)=>{
      return data.valor;
    });

    this._dashBoardService.setEficiencia(elemento);

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
    this.zonasDisponibles = this.apiDataUbicacion.map((data)=>{return data.zona});
    this.regionesDisponibles = this.apiDataUbicacion.map((data)=>{return data.region});
    this.sociedadesDisponibles = this.apiDataUbicacion.map((data)=>{return data.sociedad});
    this.sedesDisponibles = this.apiDataUbicacion.map((data)=>{return data.sede});
  }

  seleccionarSeccion(indice){
    const nodo = ["Mecanica/ConsultarMecanica","Colision/ConsultarColision"];
    this._apiService.postQuery(nodo[indice],"",this.paramsDefault).subscribe(async(data:any)=>{
      //await this.generarDataEstandarElevadorProductivo(data?.result);
      //await this.generarDataIndicadores(data?.result);
      await this._dashBoardService.setApiDataDashboard(data?.result);
      await this.cargarDataDeGraficos();
      await this.agregarFiltros();
    });
  }

  cargarDataDeGraficos(){
    this.generarDataPuestoCompleto();
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
      this.apiDataUbicacion = await data;
    });

    this._dashBoardService.getApiDataDashboard().subscribe(async(data)=>{
      this.apiDataDashboard = await data;
    });

    this._dashBoardService.getZonas().subscribe(async(data)=>{
      this.zonas = await data;
    });

    /*
      Obtener valores de tablas
    */

    this._dashBoardService.getConfigPuestoCompleto().subscribe(async (data)=>{
      this.chartOptions = data;
    });

    this._dashBoardService.getIndicadores().subscribe(async (data)=>{
      this.dataIndicadores = await data;
    });

    this._dashBoardService.getEstandarElevadorProductivo().subscribe(async(data)=>{
      this.dataEstandarElevadorProductivo = await [{name: "Valor",data,color:"#efdf00"}];
    });

    this._dashBoardService.getEficiencia().subscribe(async(data)=>{
      this.dataEficiencia = await [{name: "Valor",data,color:"#efdf00"}];
    });

    /*
      Obtener valores de tablas
    */

    this._userService.user$
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(async(user: User) => {
        this.usuario = await user;
        //this._changeDetectorRef.markForCheck();
        await this._dashBoardService.setApiDataUbicacion(this.usuario.ubicacion);
        await this.obtenerApiDataUbicacion();
        await this.seleccionarSeccion(0);
    });

  }

}
