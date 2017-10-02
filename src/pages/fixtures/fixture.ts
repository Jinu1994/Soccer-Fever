import {Team} from '../teams/team';
import * as moment from 'moment';
export class Fixture{
id:number;
competitionId:number;
date:Date;
matchday:number;
homeTeam:Team;
awayTeam:Team;
result:MatchResult;
status:string;
day:string;
time:string;

set Date(date:Date){
  this.date=date;
  this.day=date.toDateString();
  this.time=moment(date).format('h:mm A');
}

 
constructor(fields:{id:number,competitionId:number,Date:Date,matchday:number, 
                homeTeam:Team,homeTeamId:number,awayTeamId:number,awayTeam:Team,
                result:any,status:string}){
        Object.assign(this,fields)
        let result=new MatchResult(fields.result)
        this.result=result;
    }
}

class MatchResult{
    goalsHomeTeam:number;
    goalsAwayTeam:number;
    constructor(resultObject:{goalsHomeTeam:number,goalsAwayTeam:number}){
        Object.assign(this,resultObject);
    }
}