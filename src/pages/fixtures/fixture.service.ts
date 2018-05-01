import { Http, Response,Headers , URLSearchParams}  from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core'
import {Globals} from '../../app/global'

@Injectable()
export class FixtureService{
    
  constructor(private http: Http,private globals:Globals) {

  }

getAllfixturesForCompetition(fixturesLink:string){
     let headers = new Headers();
  headers.append("X-Auth-Token",this.globals.apiToken)
   return this.http.get(fixturesLink,{headers:headers})
               .map(response => response.json())
               .catch((error)=>{
                throw new Error(error);
              });
  }
  
 getAllfixturesForMatchday(fixturesLink:string,matchday:number){
     let headers = new Headers();
  headers.append("X-Auth-Token",this.globals.apiToken)
     let params=new URLSearchParams();
     params.append("matchday",matchday.toString());
   return this.http.get(fixturesLink,{headers:headers,params:params})
               .map(response => response.json())
               .catch((error)=>{
                throw new Error(error);
              });
  }
}