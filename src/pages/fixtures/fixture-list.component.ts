import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading,App } from 'ionic-angular';
import { FixtureService } from './fixture.service';
import { CompetitionService } from '../competitions/competition.service';
import { TeamService } from '../teams/team.service';
import { Matchday } from '../matchdays/matchday';
import 'rxjs/add/operator/publishReplay';

@Component({
  selector: 'fixture-list',
  templateUrl: 'fixture-list.html',
  providers: [FixtureService,TeamService],
})
export class FixtureListComponent {
  selectedCompetition: any;
  loader: Loading;
  numberOfMatchdays:number;
  matchdays:any;
  tabs:any;
  isDataAvailable:boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
        public loadingCtrl: LoadingController, public fixtureService: FixtureService, 
        public competitionService: CompetitionService,
        public teamService:TeamService,public appCtrl:App) {
    this.matchdays=new Array();
    this.isDataAvailable=false;
     
  }
 
  showMatchdayFixtures(competition) {
    this.numberOfMatchdays=competition.numberOfMatchdays;
    for(var i=1;i<=this.numberOfMatchdays;i++){
     let matchday=new Matchday(i,competition.fixturesLink,competition.teams);
        this.matchdays.push(matchday);
    }
   this.isDataAvailable=true;
  }
   changeCompetition(competition){
    this.appCtrl.getRootNav().setRoot(this.navCtrl.getActive().component,{competition:competition});
  }
  ngOnInit() {
    //this.showLoader();
    let competition = this.navParams.get("competition");
  
       this.teamService.getAllteamsForCompetition(competition.teamsDataLink)
              .subscribe(teams=>{
                competition.teams=teams;
                this.showMatchdayFixtures(competition);
    });
  }
}
