import {Team} from '../teams/team';
export class LeagueTableEntry{
    position:number;
    team:Team;
    playedGames:number;
    wins:number;
    draws:number;
    losses:number;
    goalDifference:number;
    points:number;
    constructor(fields:{position:number,
                            team:Team,
                            playedGames:number,
                            wins:number,
                            draws:number,
                            losses:number,
                            goalDifference:number,
                            points:number,}){
        Object.assign(this,fields);
    }
}