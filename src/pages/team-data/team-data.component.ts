import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular'; 
import { TeamService } from '../teams/team.service'; 
import { Team } from '../teams/team'; 
import * as HighCharts from 'highcharts';


@Component({
  selector: 'team-data',
  templateUrl: 'team-data.html',
  providers:[TeamService]
})
export class TeamDataComponent {
  selectedTeam: any;
  team:Team
  constructor(public navCtrl: NavController, public navParams: NavParams,public teamService:TeamService,
                public viewCtrl: ViewController) {
    // If we navigated to this page, we will have an item available as a nav param
    
  }
  
  
  closeModal(){
      this.viewCtrl.dismiss();
  }
  generateGraph(){
      HighCharts.chart("overall-performance",{
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false
        },
        title: {
            text: 'Overall-Performance',
            align: 'center',
            verticalAlign: 'middle',
            y: 40
        },
        tooltip: {
            pointFormat: '<b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: false,
                    distance: -50,
                    style: {
                        fontWeight: 'bold',
                        color: 'white'
                    }
                },
                startAngle: -90,
                endAngle: 90,
                center: ['50%', '75%']
            }
        },
        series: [{
            type: 'pie',
            name: 'Overall Performance',
            data: [
                ['wins',   this.team.overallPerformance.wins],
                ['draws',  this.team.overallPerformance.draws],
                ['losses', this.team.overallPerformance.losses]
            ]
        }]
    });
  }
  ngOnInit(){
    let team=this.navParams.get('team');
    this.team=team;
    this.generateGraph();
}
}
