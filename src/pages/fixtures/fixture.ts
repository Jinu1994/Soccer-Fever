import {Team} from '../teams/team'
export class Fixture{
id:number;
competitionId:number;
date:Date;
matchday:number;
homeTeam:Team;
awayTeam:Team;
result:MatchResult;
isMatchCompleted:boolean;


 
constructor(fields:{id:number,competitionId:number,date:Date,matchday:number, 
                homeTeam:Team,homeTeamId:number,awayTeamId:number,awayTeam:Team,
                result:any}){
        Object.assign(this,fields)
        let currentDate=new Date();
        this.isMatchCompleted=this.date<currentDate;
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