import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular'; 
import { TeamService } from './team.service'; 
import { Team } from './team'; 
//import {TeamDataPage} from './teamData.component'

@Component({
  selector: 'team-list',
  templateUrl: 'team-list.html',
  providers:[TeamService]
})
export class TeamListComponent {
  selectedTeam: any;
  teams:Team[]
  constructor(public navCtrl: NavController, public navParams: NavParams,public teamService:TeamService) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedTeam = navParams.get('competition');
  }
  fetchNewTeams(competition){
    this.teamService.getAllteamsForCompetition(competition.teamsLink)
    .subscribe(teams=>this.teams=teams)
  }
  // showTeamData(team:Team){
  //   this.navCtrl.push(TeamDataPage,{team:team});
  // }
  ngOnInit(){
        let teamsDataLink=this.navParams.get('competition').teamsDataLink;
        this.teamService.getAllteamsForCompetition(teamsDataLink)
    .subscribe(teams=>this.teams=teams)
  }
}
