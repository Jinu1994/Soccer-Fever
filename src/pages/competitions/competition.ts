import {Team} from '../teams/team';
export class Competition{
 id:number;
 name:string; 
 league:string;
 numberOfTeams:number; 
 numberOfGames:number; 
 numberOfMatchdays:number;
 currentMatchday:number;
 lastUpdated:string;
 fixturesLink:string;
 teamsDataLink:string;
 leagueTableLink:string;
 teams:Team[];
       
    constructor(fields:{id:number,name:string,league:string,numberOfTeams:number,
                currentMatchday:number,
                numberOfGames:number,
                numberOfMatchdays:number,
                fixturesLink:string,
                teamsDataLink:string,
                leagueTableLink:string,
                lastUpdated?:string,
                teams?:Team[]}){
                    Object.assign(this,fields)

    }
}