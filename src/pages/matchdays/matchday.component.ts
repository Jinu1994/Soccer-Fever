import { Component,ViewChild } from '@angular/core';

import { NavController, NavParams,LoadingController,Loading,App } from 'ionic-angular';
import {FixtureService} from '../fixtures/fixture.service'
import {Fixture} from '../fixtures/fixture';
import {Matchday,FixtureDay} from './matchday';
import {Team} from '../teams/team';
import {Content} from 'ionic-angular'
import 'rxjs/add/operator/publishReplay';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'match-day',
  templateUrl: 'matchday.html',
  providers:[FixtureService],
})
export class MatchdayComponent {
@ViewChild(Content) content: Content;
 matchday:Matchday;
 fixtures:Fixture[];
 loader:Loading;
 isDataAvailable:boolean=false;
  constructor(public navCtrl: NavController,public appCtrl:App, public navParams: NavParams,public loadingCtrl:LoadingController
  ,public fixtureService:FixtureService,private storage:Storage) {
    // If we navigated to this page, we will have a competition available as a nav param
   
  }
showLoader() {
 this.loader = this.loadingCtrl.create({
    content: 'Fetching Data...'
  });

  this.loader.present();
}
dismissLoader(){
this.loader.dismiss();
}
getTeam(name:string):Team{
  return this.matchday.teams.find(team=>team.name==name);
}
mapfixtures(fixturesJson){
  var self=this;
   return fixturesJson.fixtures.map(function(object):Fixture{
    let fixtureObject={
    id:object.id,
    competitionId:object.competitionId,
    Date:new Date(object.date),
    matchday:object.matchday,
    homeTeamId:object.homeTeamId,
    homeTeam:self.getTeam(object.homeTeamName),
    awayTeamId:object.awayTeamId,
    awayTeam:self.getTeam(object.awayTeamName),
    result:object.result,
    status:object.status
   };
  return new Fixture(fixtureObject);
  });
 }
 processFixtures(fixtures:Fixture[]){
      var groups={}
      fixtures.forEach(element => {
            let dayKey=element.day;
            groups[dayKey]=groups[dayKey]||[];
            groups[dayKey].push(element);
      });
      var self=this;
      Object.keys(groups).map(function(day){
          let fixtureDay=new FixtureDay(day);
          fixtureDay.fixtures=groups[day];
          self.matchday.fixtureDays.push(fixtureDay);
      });
      this.isDataAvailable=true;
 }
  fetchNewFixtures(){
   this.fixtureService.getAllfixturesForMatchday(this.matchday.fixturesLink,this.matchday.id)
    .subscribe(responseJson=>{
        let fixtures=this.mapfixtures(responseJson)
        this.processFixtures(fixtures);
      });
  }
 
  ngOnInit(){
    console.log(this.storage.get('token'));
    //this.showLoader();
    this.matchday=this.navParams.get('matchday');
    this.fetchNewFixtures();
  }
}
