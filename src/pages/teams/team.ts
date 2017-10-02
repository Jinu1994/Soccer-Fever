export class Team{
 id:number;
 name:string; 
 shortName:string;
 crestUrl:string; 
//  overallPerformance:TeamPerformance;
//  homePerformance:TeamPerformance;
//  awayPerformance:TeamPerformance;
 
constructor(fields:{id:number,name:string,shortName:string,crestUrl:string}){
           this.name=fields.name;
           this.shortName=fields.shortName;
           this.crestUrl=fields.crestUrl;
        //    this.overallPerformance=new TeamPerformance({playedGames:fields.playedGames,wins:fields.wins
        //                                     ,losses:fields.losses,draws:fields.draws,goals:fields.goals
        //                                 ,goalsAgainst:fields.goalsAgainst});
        //    this.homePerformance=new TeamPerformance(fields.home);
        //    this.awayPerformance=new TeamPerformance(fields.away);
    }
}
// class TeamPerformance{
//  playedGames:number;
//  wins:number;
//  points:number;
//  draws:number;
//  losses:number;
//  goals:number;
//  goalsAgainst:number;
//  goalDifference:number;
//  constructor(fields:{playedGames:number,wins:number,losses:number,draws:number,
//                         goals:number,goalsAgainst:number}){
//                             Object.assign(this,fields);
//                             this.points=this.wins*3+this.draws*2;
//                             this.goalDifference=this.goals-this.goalsAgainst;
//                         }

// }

