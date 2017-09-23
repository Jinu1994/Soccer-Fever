import {Team} from '../teams/team'
import {GroupLeagueTablePage} from './groupLeagueTable.component'


export class GroupLeagueTable{
  name:string;
  component:any;
  groupTableEntries:GroupLeagueTableEntry[];
  teams:Team[];
  getTeam(name:string):Team{
  return this.teams.find(team=>team.name==name);
}
  constructor(name:string,data:any,teams:Team[]){
      var self=this;
      self.name=name;
      self.component=GroupLeagueTablePage;
      this.teams=teams;
      self.groupTableEntries=data.map(function(object){
          return {
      groupName:object.group,
      rank:object.rank,
      team:self.getTeam(object.team),
      playedGames:object.playedGames,
      goals:object.goals,
      goalsAgainst:object.goalsAgainst,
      goalDifference:object.goalDifference,
      points:object.points
   };
      });
}
}
export class GroupLeagueTableEntry{
    groupName:string;
    rank:number;
    team:Team;
    playedGames:number;
    points:number;
    goals:number;
    goalsAgainst:number;
    goalDifference:number;
    component:any;
    constructor(fields:{groupName:string,team:Team,points:number,goals:number,goalsAgainst:number,goalDifference:number}){
        Object.assign(this,fields);
        this.component=GroupLeagueTablePage;
    }
}

