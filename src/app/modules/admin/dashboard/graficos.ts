import { ChartOptions } from "./dashboard.component";

export const valoresGraficosDefaultPuesto:Partial<ChartOptions> = {
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
        data: [],//Estos son los valores a mostrar
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
          position: "top"
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
      categories: [],//Estas son las etiquetas que se muestran
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


  export const valoresGraficosDefaultEstandar:Partial<ChartOptions> = {
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
        data: [],//Estos son los valores a mostrar
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
          position: "top"
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
      categories: [],//Estas son las etiquetas que se muestran
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


  export const valoresGraficosDefaultEficiencia:Partial<ChartOptions> = {
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
        data: [],//Estos son los valores a mostrar
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
          position: "top"
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
      categories: [],//Estas son las etiquetas que se muestran
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


  export const valoresGraficosDefaultProductividad:Partial<ChartOptions> = {
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
        data: [],//Estos son los valores a mostrar
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
          position: "top"
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
      categories: [],//Estas son las etiquetas que se muestran
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

  
  export const valoresGraficosDefaultEntradas:Partial<ChartOptions> = {
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
        data: [],//Estos son los valores a mostrar
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
          position: "top"
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
      categories: [],//Estas son las etiquetas que se muestran
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

  export const valoresIndicadoresDefault = [
    {
      clave:"Tasa ocupacion",
      nombreCampo:"productividad",
      valor: 0
    },
    {
      clave:"Tasa eficiencia",
      nombreCampo:"tasaEficiencia",
      valor: 0
    },
    {
      clave:"Tasa empleo",
      nombreCampo:"tasaEmpleo",
      valor: 0
    },
    {
      clave:"Capacidad de servicio - puesto completo",
      valor: 0
    },
    {
      clave:"Tecnicos / elevadores",
      valor: 0
    },
    {
      clave:"Pulmones / elevador",
      valor: 0
    },
    {
      clave:"Puestos de trabajo - completos",
      valor: 0
    },
    {
      clave:"Elevadores",
      valor: 0
    },
    {
      clave:"Entradas totales",
      valor: 0
    },
    {
      clave:"Entradas x puesto completo",
      valor: 0
    }
  ];

  export const ubicaciones = {
    region: [],
    sede: [],
    sociedad: [],
    zona: []
  }