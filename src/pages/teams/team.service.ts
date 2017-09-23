import { Http, Response,Headers }  from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Team} from './team';
import {Injectable} from '@angular/core'

@Injectable()
export class TeamService{
  constructor(private http: Http) {

  }
 private mapteams(teamsJson){
   return teamsJson.standing.map(function(object):Team{
    let teamObject={
    id:object.id,
    name:object.teamName,
    crestUrl:object.crestURI,
    playedGames:object.playedGames,
    wins:object.wins,
    draws:object.draws,
    losses:object.losses,
    goals:object.goals,
    goalsAgainst:object.goalsAgainst,
    home:object.home,
    away:object.away
   };
   
   return new Team(teamObject);
  });
 }
getAllteamsForCompetition(teamsUrl){
     let headers = new Headers();
     headers.append("X-Auth-Token","7ee428eb8008489186fe2f17a348a1c6");
   return this.http.get(teamsUrl,{headers:headers})
               .map(response => this.mapteams(response.json()))
               .catch(this.handleError);
  }
 
  private handleError(error: Response|any){
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