import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishLast';
import { Globals } from '../../app/global'
import { Competition } from './competition';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { TeamService } from '../teams/team.service';

@Injectable()
export class CompetitionService {
  private getCompetitionsUrl = "http://api.football-data.org/v1/competitions?season=2017";
  competitions: Observable<Competition[]>;
  constructor(private http: Http, private globals: Globals,private teamService:TeamService) {
  }
  private mapCompetitions(competionsJson) {
    return competionsJson.map(function (object): Competition {
      let competitionObject = {
        id: object.id,
        name: object.caption,
        league: object.league,
        numberOfTeams: object.numberOfTeams,
        numberOfGames: object.numberOfGames,
        numberOfMatchdays: object.numberOfMatchdays,
        currentMatchday: object.currentMatchday,
        fixturesLink: object._links.fixtures.href,
        teamsDataLink: object._links.teams.href,
        leagueTableLink: object._links.leagueTable.href
      };
     
      return new Competition(competitionObject);
    });
  }
  getAllCompetitions(){
   
      let headers = new Headers();
      headers.append("X-Auth-Token", this.globals.apiToken)
      this.http.get(this.getCompetitionsUrl, { headers: headers })
        .map(response => this.mapCompetitions(response.json()))
        .catch((error)=>{
          throw new Error(error);
        })
        .subscribe((competitions)=>this.setGlobals(competitions));
    
  }
  getTeamsForCompetition(){
        this.teamService.getAllteamsForCompetition(this.globals.selectedCompetition.teamsDataLink)
      .subscribe(teams=>{
        this.globals.selectedCompetition.teams=teams;
        this.globals.competitionsFetched.next(true);
      });
      
  }
  setGlobals(competitions){
    this.globals.competitions=competitions;
    this.globals.selectedCompetition=competitions.find(competition=>competition.name.startsWith("Premier League 20"));
    this.getTeamsForCompetition();
    
  }




}