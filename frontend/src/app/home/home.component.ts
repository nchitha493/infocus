import { Component, OnInit, ViewChild,AfterViewInit, ElementRef,NgZone} from '@angular/core';
import { UserService } from '../services/user.service';
import {Router} from '@angular/router';
import { ToasterService } from '../toaster.service';
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4core from "@amcharts/amcharts4/core";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users:any = localStorage.getItem("user");
  chartType: any = 'XYChart';
  public chart: any;
  categoryAxis : am4charts.CategoryAxis;
  columnSeriesOne: am4charts.ColumnSeries;
  columnSeriesTwo: am4charts.ColumnSeries;
  valueAxis: am4charts.ValueAxis;
  graphs: am4charts.Series[] = [];
  @ViewChild('charRef') charRef:any;
  constructor(private userService: UserService,private toaster: ToasterService,private router:Router,private zone: NgZone) {
    this.users = JSON.parse(this.users);
   
    this.categoryAxis = new am4charts.CategoryAxis();
    this.categoryAxis.dataFields.category = "country";
    this.valueAxis = new am4charts.ValueAxis();
    //series 1
    this.columnSeriesOne = new am4charts.ColumnSeries();
    this.columnSeriesOne.dataFields.valueY = "litres";
    this.columnSeriesOne.dataFields.categoryX = "country";
    this.columnSeriesOne.stacked = true;
    //series 2
    this.columnSeriesTwo = new am4charts.ColumnSeries();
    this.columnSeriesTwo.dataFields.valueY = "litres";
    this.columnSeriesTwo.dataFields.categoryX = "country";
    this.columnSeriesTwo.stacked = true;
    this.graphs.push(this.columnSeriesOne);
    this.graphs.push(this.columnSeriesTwo);
   }
   ngAfterViewInit() {
    this.userService.chart().subscribe((data:any)=>{
      this.zone.runOutsideAngular(() => {
        const chart:any = am4core.create(this.charRef.nativeElement, am4charts.XYChart);
        chart.xAxes.push(this.categoryAxis);
        chart.yAxes.push(this.valueAxis);
        this.graphs.forEach(s => chart.series.push(s));
        chart.data = data;
        this.chart = chart;
      });
    },(error)=>{
    });
  }


   public changeSeriesOneColor(color:string = "#ff0000"){
    this.columnSeriesOne.columns.template.stroke = am4core.color(color); // red outline
    this.columnSeriesOne.columns.template.fill = am4core.color(color);
}

public changeSeriesTwoColor(color:string = "#ff0000"){
    this.columnSeriesTwo.columns.template.stroke = am4core.color(color); // red outline
    this.columnSeriesTwo.columns.template.fill = am4core.color(color);
}
  ngOnInit(): void {
  }
  logout(){
    this.userService.logout().subscribe((data:any)=>{
      localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.router.navigate(['/'])
    },(error)=>{
      console.log("error");
      this.toaster.show('error', error.error.message, '', 3000);
    });
  }
  logoutAll(){
    this.userService.logoutAll().subscribe((data:any)=>{
      localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.router.navigate(['/'])
    },(error)=>{
      console.log("error");
      this.toaster.show('error', error.error.message, '', 3000);
    });
  }

}
