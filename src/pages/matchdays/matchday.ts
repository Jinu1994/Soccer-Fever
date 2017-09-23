
import {MatchdayPage} from './matchday.component';
import {Team} from '../teams/team';

export class Matchday{
    fixturesLink:string;
    id:number;
    title:string;
    component:any;
    teams:Team[];
    constructor(id:number,fixturesLink:string,teams:Team[]){
        this.id=id;
        this.title=`Matchday${id}`;
        this.fixturesLink=fixturesLink;
        this.component=MatchdayPage;
        this.teams=teams;
    }
}