import { Http, Response,Headers }  from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core'

@Injectable()
export class LeagueTableService{
    
  constructor(private http: Http) {

  }
 
getLeagueTableDataForCompetition(leagueTableUrl){
     let headers = new Headers();
     headers.append("X-Auth-Token","7ee428eb8008489186fe2f17a348a1c6");
   return this.http.get(leagueTableUrl,{headers:headers})
               .map(response =>response.json())
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