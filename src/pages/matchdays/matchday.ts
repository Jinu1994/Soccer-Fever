
import {MatchdayComponent} from './matchday.component';
import {Team} from '../teams/team';
import {Fixture} from '../fixtures/fixture'
export class FixtureDay{
    day:string;
    time:string;
    fixtures:Fixture[];
    constructor(day:string){
        this.day=day;
        this.fixtures=[];
    }
}

export class Matchday{
    fixturesLink:string;
    id:number;
    title:string;
    fixtureDays:FixtureDay[];
    component:any;
    teams:Team[];
    constructor(id:number,fixturesLink:string,teams:Team[]){
        this.id=id;
        this.title=`Matchday${id}`;
        this.fixturesLink=fixturesLink;
        this.component=MatchdayComponent;
        this.teams=teams;
        this.fixtureDays=[];
    }

}

