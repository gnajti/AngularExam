import { Component, Input, input } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexNonAxisChartSeries, ApexTitleSubtitle, ChartType } from "ng-apexcharts";
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})
export class ChartComponent {
  chart: ApexChart
  series: ApexAxisChartSeries | ApexNonAxisChartSeries
  title: ApexTitleSubtitle
  labels: string[]

  @Input() titl : string
  @Input() chartValues: number[]
  @Input() chartLabels: string[]
  @Input() width: number
  @Input() type: ChartType

  constructor(){
    
  }
  ngOnInit(): void {
    console.log(this.titl, this.chartValues)
    this.title = {
      text:this.titl
    }
    this.series = this.chartValues

    this.labels = this.chartLabels
    this.chart = {
      type: this.type,
      width: this.width
    }
    
  }
}
