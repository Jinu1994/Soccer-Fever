import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams,LoadingController,Loading,App } from 'ionic-angular';
import {LeagueTableService} from './leagueTable.service'
import {TeamService} from '../teams/team.service'
import {LeagueTableEntry} from './leagueTableEntry';
import { CompetitionService } from '../competitions/competition.service';
import {GroupLeagueTable} from '../groupLeagueTable/groupLeagueTableEntry';
import {Team} from '../teams/team';
import {Content} from 'ionic-angular'
import 'rxjs/add/operator/publishReplay';
import { Competition } from '../competitions/competition';

@Component({
  selector: 'league-table',
  templateUrl: 'leagueTable.html',
  providers:[LeagueTableService,TeamService],
})
export class LeagueTableComponent {
@ViewChild(Content) content: Content;
 competition:Competition;
 leagueTableEntries:LeagueTableEntry[];
 loader:Loading;
 groups:any;
 isGroupedCompetition:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl:LoadingController
  ,public leagueTableService:LeagueTableService,public teamService:TeamService,public appCtrl:App
  ,public competitionService:CompetitionService) {
    // If we navigated to this page, we will have a competition available as a nav param
   this.groups=new Array();
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
  return this.competition.teams.find(team=>team.name==name);
}
mapleagueTableEntries(leagueTableEntriesJson){
  var self=this;
  return leagueTableEntriesJson.standing.map(function(object):LeagueTableEntry{
    let team=self.getTeam(object.teamName);

    team.setPerformance(object.position,object);
    let leagueTableEntryObject={
      position:object.position,
      team:team,
      playedGames:object.playedGames,
      wins:object.wins,
      draws:object.draws,
      losses:object.losses,
      goalDifference:object.goalDifference,
      points:object.points
   };

  return new LeagueTableEntry(leagueTableEntryObject);
  });
 }
 
showGroupLeagueTables(groupNames,data,matchday){
    for(var i=0;i<groupNames.length;i++){
      let groupData=new GroupLeagueTable(`Group ${groupNames[i]}`,data[groupNames[i]],this.competition.teams,matchday);
      this.groups.push(groupData); 
    }
    this.dismissLoader();
    this.isGroupedCompetition=true;
 }

 getLeagueTableDataForCompetition(competition){
   
   this.showLoader();
   this.leagueTableService.getLeagueTableDataForCompetition(competition.leagueTableLink)
    .subscribe(leagueTableEntries=>{
            if(!leagueTableEntries.standing){
              var standings=leagueTableEntries.standings;
              var groupNames=Object.keys(standings);
              this.showGroupLeagueTables(groupNames,standings,leagueTableEntries.matchday);
            }else{
            this.leagueTableEntries=this.mapleagueTableEntries(leagueTableEntries);
            this.isGroupedCompetition=false;
            this.dismissLoader();
            }
        });
 }
  
  ngOnInit(){
    this.competition = this.navParams.get("competition");
    this.getLeagueTableDataForCompetition(this.competition);
      }
}

