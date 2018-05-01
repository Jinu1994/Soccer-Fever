import {Component,ChangeDetectorRef,ViewChild} from '@angular/core';
import {FixtureListComponent} from '../fixtures/fixture-list.component';
import {LeagueTableComponent} from '../leagueTable/leagueTable.component';
import {TeamListComponent} from '../teams/team-list.component';
import {Globals} from '../../app/global';
import { App, NavController, Tabs, NavParams } from 'ionic-angular';
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
        ,private storage:Storage
        ,private navParams:NavParams){

    }
    
    ngOnInit(){
        this.globals.competitionsFetched.subscribe((value)=>{
            if(value){
                var self=this;
                this.storage.get('user').then((user)=>{
                    self.rootParams={competition:this.globals.competitions.find(competition=>competition.id===this.globals.selectedCompetition.id)};
                    self.isDataAvailable=true;
                    self.cdRef.detectChanges();
                });
               
            }
        });
        this.competitionService.getAllCompetitions();
    }
    
    

    changeCompetition(competition){
        var self=this;
        this.selectedTabIndex=this.tabRef.getSelected().index;
        this.storage.get('user').then((user)=>{
            user.competitionId=competition.id;
            self.storage.set('user',user);
            self.isDataAvailable=false;
            self.cdRef.detectChanges();
            self.globals.competitionsFetched.next(true);
        });
        
        
      }
}