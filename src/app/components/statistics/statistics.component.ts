import { Component, OnInit } from '@angular/core';
import { ApiUserService } from 'src/app/services/api-user.service';
declare let google: any;

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  programsList: Array<any> = []; // Programs registered by all users
  careerList: Array<any> = []; // Careers registered for each user
  userList: Array<any> = []; // Users registered in the DB
  // Number of students in each program
  programSummerUSA: number = 0;
  programSummerCan: number = 0;
  programWork: number = 0;
  programInter: number = 0;
  // Number of students from each career
  carPIAM: number = 0;
  carERAES: number = 0;
  carDNAM: number = 0;
  carAACH: number = 0;
  carMTASMF: number = 0;
  carMTAA: number = 0;
  carPM: number = 0;
  carAAFEP: number = 0;
  carCT: number = 0;
  carMAI: number = 0;
  carLACS: number = 0;
  carTIDSM: number = 0;
  carTIIRD: number = 0;

  constructor(private ApiUserService: ApiUserService) {
    setTimeout(() => {
      this.userList = ApiUserService.information;
      this.userList.forEach(p => {
        this.programsList = this.programsList.concat(p.arrPrograms);
        this.careerList = this.careerList.concat(p.strCareer);
      });
      for(let i = 0; i < this.programsList.length; i++){
        switch (this.programsList[i]) {
          case "Summer Camps in the USA":
            this.programSummerUSA++;
          break;
          case "Summer Camps in Canada":
            this.programSummerCan++;
          break;
          case "Work and Travel in the USA":
            this.programWork++;
          break;
          case "Inter and trainee programs":
            this.programInter++;
          break;
        }
      }
      for(let i = 0; i < this.careerList.length; i++){
        switch (this.careerList[i]) {
          case "PIAM":
            this.carPIAM++;
          break;
          case "ERAES":
            this.carERAES++;
          break;
          case "DNAM":
            this.carDNAM++;
          break;
          case "AACH":
            this.carAACH++;
          break;
          case "MTASMF":
            this.carMTASMF++;
          break;
          case "MTAA":
            this.carMTAA++;
          break;
          case "PM":
            this.carPM++;
          break;
          case "AAFEP":
            this.carAAFEP++;
          break;
          case "CT":
            this.carCT++;
          break;
          case "MAI":
            this.carMAI++;
          break;
          case "LACS":
            this.carLACS++;
          break;
          case "TIDSM":
            this.carTIDSM++;
          break;
          case "TIIRD":
            this.carTIIRD++;
          break;
        }
      }
      let informationPrograms = [
        ['Program', 'Students'],
        ['Summer Camps in the USA', this.programSummerUSA],
        ['Summer Camps in Canada', this.programSummerCan],
        ['Work and Travel in the USA', this.programWork],
        ['Inter and trainee programs', this.programInter]
      ];
      let informationCareers = [
        ['Career', 'Students'],
        ['PIAM', this.carPIAM],
        ['ERAES', this.carERAES],
        ['DNAM', this.carDNAM],
        ['AACH', this.carAACH],
        ['MTASMF', this.carMTASMF],
        ['MTAA', this.carMTAA],
        ['PM', this.carPM],
        ['AAFEP', this.carAAFEP],
        ['CT', this.carCT],
        ['MAI', this.carMAI],
        ['LACS', this.carLACS],
        ['TIDSM', this.carTIDSM],
        ['TIIRD', this.carTIIRD],
      ];
      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(() => {
        this.drawChart(informationCareers, informationPrograms);
      });
    }, 800);
  }

  /**
   * This function draws the chart in the HTML document, depending on the information
   * sended by parameters.
   * @param infoCareers Bi-dimensional array with the information of the careers and
   * number of students [[career, students]]
   * @param infoPrograms Bi-dimensional array with the information of the programs and
   * number of students [[program, students]]
   */
  drawChart(infoCareers: any, infoPrograms: any) {
    let dataCareers = google.visualization.arrayToDataTable();
    let dataPrograms = google.visualization.arrayToDataTable(infoPrograms);
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
