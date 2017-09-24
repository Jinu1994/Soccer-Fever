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

@Component({
  selector: 'league-table',
  templateUrl: 'leagueTable.html',
  providers:[LeagueTableService,TeamService],
})
export class LeagueTableComponent {
@ViewChild(Content) content: Content;
 teams:Team[];
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
  return this.teams.find(team=>team.name==name);
}
mapleagueTableEntries(leagueTableEntriesJson){
  var self=this;
  return leagueTableEntriesJson.standing.map(function(object):LeagueTableEntry{
    let leagueTableEntryObject={
      position:object.position,
      team:self.getTeam(object.teamName),
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
 
showGroupLeagueTables(groupNames,data){
    for(var i=0;i<groupNames.length;i++){
      let groupData=new GroupLeagueTable(`Group ${groupNames[i]}`,data[groupNames[i]],this.teams);
      this.groups.push(groupData); 
    }
    this.dismissLoader();
    this.isGroupedCompetition=true;
 }
 changeCompetition(competition){
    this.appCtrl.getRootNav().setRoot(this.navCtrl.getActive().component,{competition:competition});
}
 getLeagueTableDataForCompetition(competition){
   
      this.showLoader();
   this.leagueTableService.getLeagueTableDataForCompetition(competition.leagueTableLink)
    .subscribe(leagueTableEntries=>{
      if(!competition.teams){
        this.teamService.getAllteamsForCompetition(competition.teamsDataLink)
        .subscribe(teams=>{
            this.teams=competition.teams=teams;
            if(!leagueTableEntries.standing){
              var standings=leagueTableEntries.standings;
              var groupNames=Object.keys(standings);
              this.showGroupLeagueTables(groupNames,standings);
            }else{
            this.leagueTableEntries=this.mapleagueTableEntries(leagueTableEntries);
            this.isGroupedCompetition=false;
            this.dismissLoader();
            }
        });
      }else{
        this.teams=competition.teams;
        if(!leagueTableEntries.standing){
              var standings=leagueTableEntries.standings;
              var groupNames=Object.keys(standings);
              this.showGroupLeagueTables(groupNames,standings);
            }else{
            this.leagueTableEntries=this.mapleagueTableEntries(leagueTableEntries);
            this.isGroupedCompetition=false;
            this.dismissLoader();
            }
      }
    })
 }
  
  ngOnInit(){
    let competition = this.navParams.get("competition");
    if (!competition) {
       this.competitionService.getAllCompetitions()
        .subscribe(
          competitions => {
            let defaultCompetition=competitions.find(competition=>competition.name.startsWith("Premier League 20"));
              this.teamService.getAllteamsForCompetition(defaultCompetition.teamsDataLink)
              .subscribe(teams=>{
                defaultCompetition.teams=teams;
                this.getLeagueTableDataForCompetition(defaultCompetition);
              });
          });
        
    }
    else {
       this.teamService.getAllteamsForCompetition(competition.teamsDataLink)
              .subscribe(teams=>{
                competition.teams=teams;
                this.getLeagueTableDataForCompetition(competition);
    });
    }
      
  }
}

