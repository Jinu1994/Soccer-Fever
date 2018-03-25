import {Component,ChangeDetectorRef,ViewChild} from '@angular/core';
import {FixtureListComponent} from '../fixtures/fixture-list.component';
import {LeagueTableComponent} from '../leagueTable/leagueTable.component';
import {TeamListComponent} from '../teams/team-list.component';
import {Globals} from '../../app/global';
import { App, NavController, Tabs } from 'ionic-angular';
import {CompetitionService} from '../competitions/competition.service';
import {TeamService} from '../teams/team.service';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'main-tabs',
    templateUrl: 'main-tabs.html',
    providers:[CompetitionService,TeamService]
})
export class MainTabsComponent {
    rootParams:any;
    isDataAvailable:boolean=false;
    leagueTablePage=LeagueTableComponent;
    fixtureListPage=FixtureListComponent;
    teamListPage=TeamListComponent;
    selectedTabIndex:number=1;
    @ViewChild('mainTab') tabRef: Tabs;
    constructor(public globals:Globals
        ,private cdRef:ChangeDetectorRef
        , public appCtrl:App
        ,public navCtrl:NavController
        ,public competitionService:CompetitionService
        ,public teamService:TeamService
        ,private storage:Storage){

    }
   
    ngOnInit(){
        this.storage.get('token').then(name=>{
            console.log(name);
        });
        
        this.globals.competitionsFetched.subscribe((value)=>{
            if(value){
                var self=this;
                self.rootParams={competition:this.globals.selectedCompetition};
                self.isDataAvailable=true;
                self.cdRef.detectChanges();
            }
        });
        this.globals.competitionsFetched.next(true);
    }
    
    

    changeCompetition(competition){
        this.selectedTabIndex=this.tabRef.getSelected().index;
        this.isDataAvailable=false;
        this.cdRef.detectChanges();
        this.globals.competitionsFetched.next(true);
        
      }
}