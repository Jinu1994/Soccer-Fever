import {Component,ChangeDetectorRef} from '@angular/core';
import {FixtureListComponent} from '../fixtures/fixture-list.component';
import {LeagueTableComponent} from '../leagueTable/leagueTable.component';
import {TeamListComponent} from '../teams/team-list.component';
import {Globals} from '../../app/global';

@Component({
    selector: 'main-tabs',
    templateUrl: 'main-tabs.html'
})
export class MainTabsComponent {
    rootParams:any;
    isDataAvailable:boolean=false;
    leagueTablePage=LeagueTableComponent;
    fixtureListPage=FixtureListComponent;
    teamListPage=TeamListComponent;
    constructor(public globals:Globals,private cdRef:ChangeDetectorRef){

    }
    ngOnInit(){
        this.globals.competitionsFetched.subscribe((value)=>{
            if(value){
                var self=this;
                this.rootParams={competition:this.globals.selectedCompetition};
                
                    self.isDataAvailable=true;
                    this.cdRef.detectChanges();
            }
     });
    }

}