import { Component, OnInit, ViewChild } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexGrid, ApexPlotOptions, ApexTitleSubtitle, ApexXAxis, ApexYAxis, ChartComponent } from 'ng-apexcharts';

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
  public chartOptions: Partial<ChartOptions>;
  chartOptions2: { series: number[]; chart: { width: number; type: string; }; labels: string[]; responsive: { breakpoint: number; options: { chart: { width: number; }; legend: { position: string; }; }; }[]; };

  constructor() {

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
          data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3],
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
      series: [50, 20],
      chart: {
        width: 300,
        type: "pie"
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
              position: "bottom"
            }
          }
        }
      ]
    };


  }

  ngOnInit(): void {
  }

}
