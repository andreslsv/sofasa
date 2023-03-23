import { Component, OnInit, ViewChild } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexGrid, ApexPlotOptions, ApexTitleSubtitle, ApexXAxis, ApexYAxis, ChartComponent } from 'ng-apexcharts';
import { DashboardService } from './dashboard.service';

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

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  chartOptions2: { series: number[]; colors: string[]; stroke:{width:number}; chart: { width: number; type: string; }; labels: string[]; responsive: { breakpoint: number; options: { chart: { width: number; }; legend: { position: string; show:boolean; }; }; }[]; };
  displayedColumns: string[] = ['position', 'name'];
  dataSource = ELEMENT_DATA;

  dataIndicadores:any;
  dataPersonalProductivo:any;
  dataActividadesSede:any;

  dataPuestoCompleto = [
    {
      name: "Valor",
      data: [],
      color:"#efdf00"
    }
  ];
  
  dataEstandarElevadorProductivo = [
    {
      name: "Valor",
      data: [],
      color:"#efdf00"
    }
  ];

  dataFichajeRedRenault=[10,6];
  dataClipRedRenault=[2,2];

  constructor(private _dashBoardService:DashboardService) {

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
        categories: [
          "Zona1",
          "Zona2",
          "Zona3",
          "Zona4",
          "Zona5",
          "Zona6",
          "Zona7",
          "Zona8"
        ],
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


    this.chartOptions2 = {
      colors: ["#000", "#efdf00"],
      series: [
        50, 20
      ],
      chart: {
        width: 300,
        type: "pie",
      },
      stroke:{
        width:0
      },
      labels: ["Si", "No"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              show: false,
              position: "right"
            }
          }
        }
      ]
    };


  }

  ngOnInit(): void {
    this._dashBoardService.getActividadSede().subscribe(async(data)=>{
      this.dataActividadesSede = await data;
    });

    this._dashBoardService.getPersonalProductivo().subscribe(async(data)=>{
      this.dataPersonalProductivo = await data;
    });

    this._dashBoardService.getIndicadores().subscribe(async (data)=>{
      this.dataIndicadores = await data;
    });

    this._dashBoardService.getPuestoCompleto().subscribe(async(data)=>{
      this.dataPuestoCompleto[0].data = await data;
    });

    this._dashBoardService.getEstandarElevadorProductivo().subscribe(async(data)=>{
      this.dataEstandarElevadorProductivo[0].data = await data;
    });
    
    this._dashBoardService.getFichajeRedRenault().subscribe(async(data)=>{
      this.dataFichajeRedRenault = await data;
    });

    this._dashBoardService.getClipRedRenault().subscribe(async(data)=>{
      this.dataClipRedRenault = await data;
    });
  }

}
