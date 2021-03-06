import { Component, OnInit } from '@angular/core';
import { GlobalDataSummary } from 'src/app/models/global-data';
import { ChartType } from 'angular-google-charts';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css'],
})
export class CountriesComponent implements OnInit {
  data: GlobalDataSummary[] = [];
  countries: string[] = [];
  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  datatable: any[]=[];
  chart = {
    LineChart: ChartType.LineChart,
    height: 500,
    width: 800,
    options: {
      animation: 1000,
      easing: 'out', 
      is3D: true,
    },
   
  };

  constructor(private service: DataServiceService) {}

  ngOnInit(): void {
    this.service.getGlobalData().subscribe((result) => {
      this.data = result;
      this.data.forEach((cs) => {
        this.countries.push(cs.country || '');
      });
    });
  }

  updateChart(){
    this.datatable=[];
    this.datatable.push(['Cases','Date'])
  }

  updateValues(country: string) {
    console.log(country);
    this.data.forEach((cs) => {
      if (cs.country == country) {
        this.totalConfirmed = cs.confirmed || 1;
        this.totalRecovered = cs.recovered || 1;
        this.totalActive = cs.active || 1;
        this.totalDeaths = cs.deaths || 1;
      }
    });
  }
}
