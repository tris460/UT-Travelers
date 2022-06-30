import { Component, OnInit } from '@angular/core';
declare let google: any;

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  constructor() {
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(this.drawChart);
  }

  drawChart() {
    let dataCareers = google.visualization.arrayToDataTable([
      ['Career', 'Students'],
      ['TIDSM', 11],
      ['TIARD', 2],
      ['MAI', 2],
      ['PA', 2],
      ['DNAM', 7]
    ]);
    let dataPrograms = google.visualization.arrayToDataTable([
      ['Program', 'Students'],
      ['Summer Camps in the USA', 11],
      ['Summer Camps in Canada', 8],
      ['Work and Travel in the USA', 4],
      ['Inter and trainee programs', 1],
    ]);
    let optionsCareers = {
      title: 'Careers'
    };
    let optionsPrograms = {
      title: 'Programs'
    };
    let chartCareers = new google.visualization.PieChart(<HTMLElement>document.getElementById('piechart-careers'));
    let chartPrograms = new google.visualization.PieChart(<HTMLElement>document.getElementById('piechart-programs'));
    chartCareers.draw(dataCareers, optionsCareers);
    chartPrograms.draw(dataPrograms, optionsPrograms);
  }
  ngOnInit(): void {
  }

}
