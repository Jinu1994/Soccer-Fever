import { Component,Output,EventEmitter } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Competition} from './competition';
import {CompetitionService} from './competition.service'
import {Globals} from '../../app/global'
import {Events} from 'ionic-angular'
@Component({
  selector: 'competition-list',
  templateUrl: 'competitionList.html'
})
export class CompetitionList {
   selectedCompetition:Competition;
   competitions:Competition[];
   @Output() changeCompetition:EventEmitter<Competition>=new EventEmitter<Competition>();
  constructor(public navCtrl: NavController
              , public navParams: NavParams
              ,public globals:Globals,
              public competitionService:CompetitionService,
              private events:Events
              ){
 
   }
   changeSelection(){
       this.changeCompetition.emit(this.globals.selectedCompetition);
   }
}
