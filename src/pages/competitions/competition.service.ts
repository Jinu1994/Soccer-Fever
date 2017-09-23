import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishLast';
import { Globals } from '../../app/global'
import { Competition } from './competition';
import { Injectable } from '@angular/core'

@Injectable()
export class CompetitionService {
  private getCompetitionsUrl = "http://api.football-data.org/v1/competitions?season=2017";
  competitions: Observable<Competition[]>;
  constructor(private http: Http, private globals: Globals) {
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
        teamsDataLink: object._links.leagueTable.href,
        leagueTableLink: object._links.leagueTable.href
      };
     
      return new Competition(competitionObject);
    });
  }
  getAllCompetitions(): Observable<Competition[]> {
   
      let headers = new Headers();
      headers.append("X-Auth-Token", this.globals.apiToken)
      this.competitions = this.http.get(this.getCompetitionsUrl, { headers: headers })
        .map(response => this.mapCompetitions(response.json()))
        .catch(this.handleError);
      return this.competitions;
    
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }




}