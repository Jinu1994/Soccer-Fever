import { Component,Output,EventEmitter } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Competition} from './competition';
import {CompetitionService} from './competition.service'
import {TeamService} from '../teams/team.service';
import {Globals} from '../../app/global'
@Component({
  selector: 'competition-list',
  templateUrl: 'competition-list.html'
})
export class CompetitionListComponent {
   selectedCompetition:Competition;
   competitions:Competition[];
   @Output() changeCompetition:EventEmitter<Competition>=new EventEmitter<Competition>();
  constructor(public navCtrl: NavController
              , public navParams: NavParams
              ,public globals:Globals,
              public competitionService:CompetitionService,
              public teamService:TeamService
              ){
 
   }
   changeSelection(){
       
       if(!this.globals.selectedCompetition.teams){
          this.teamService.getAllteamsForCompetition(this.globals.selectedCompetition.teamsDataLink)
            .subscribe(teams=>{
              this.globals.selectedCompetition.teams=teams;
              this.changeCompetition.emit(this.globals.selectedCompetition);
            })
       }else{
            this.changeCompetition.emit(this.globals.selectedCompetition);
       }
   }
}
