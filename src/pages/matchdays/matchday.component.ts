import { Component,ViewChild } from '@angular/core';

import { NavController, NavParams,LoadingController,Loading,App } from 'ionic-angular';
import {FixtureService} from '../fixtures/fixture.service'
import {Fixture} from '../fixtures/fixture';
import {Matchday} from './matchday';
import {Team} from '../teams/team';
import {Content} from 'ionic-angular'
import 'rxjs/add/operator/publishReplay';

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
  ,public fixtureService:FixtureService) {
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
    date:new Date(object.date),
    matchday:object.matchday,
    homeTeamId:object.homeTeamId,
    homeTeam:self.getTeam(object.homeTeamName),
    awayTeamId:object.awayTeamId,
    awayTeam:self.getTeam(object.awayTeamName),
    result:object.result
   };
  return new Fixture(fixtureObject);
  });
 }
 showFixtures(fixtures){
    this.fixtures=fixtures;
    //this.dismissLoader();
    this.isDataAvailable=true;
 }
  fetchNewFixtures(){
   this.fixtureService.getAllfixturesForMatchday(this.matchday.fixturesLink,this.matchday.id)
    .subscribe(responseJson=>{
        let fixtures=this.mapfixtures(responseJson)
        this.showFixtures(fixtures);
      });
  }
 
  ngOnInit(){
    //this.showLoader();
    this.matchday=this.navParams.get('matchday');
    this.fetchNewFixtures();
  }
}
