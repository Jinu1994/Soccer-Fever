export class Team{
 id:number;
 name:string; 
 shortName:string;
 crestUrl:string; 
 rank:number;
 overallPerformance:TeamPerformance;
 homePerformance:TeamPerformance;
 awayPerformance:TeamPerformance;
 public setPerformance(position:number,performanceInfo:any){
     this.rank=position;
     this.overallPerformance=new TeamPerformance(performanceInfo);
     this.homePerformance=new TeamPerformance(performanceInfo.home);
     this.awayPerformance=new TeamPerformance(performanceInfo.away);
 }
constructor(fields:{id:number,name:string,shortName:string,crestUrl:string}){
           this.name=fields.name;
           this.shortName=fields.shortName;
           this.crestUrl=fields.crestUrl;
    }
}
class TeamPerformance{
 playedGames:number;
 wins:number;
 points:number;
 draws:number;
 losses:number;
 goals:number;
 goalsAgainst:number;
 goalDifference:number;
 constructor(performanceInfo:any){
    //  this.wins=performanceInfo.wins;
    //  this.draws=performanceInfo.draws;
    //  this.losses=performanceInfo.losses;
    //  this.goals=performanceInfo.goals;
    Object.assign(this,performanceInfo);
    this.points=this.wins*3+this.draws*2;
    this.goalDifference=this.goals-this.goalsAgainst;
  }

}

