import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular'; 
import { TeamService } from './team.service'; 
import { Team } from './team'; 
import {TeamDataComponent} from '../team-data/team-data.component'

@Component({
  selector: 'team-list',
  templateUrl: 'team-list.html',
  providers:[TeamService]
})
export class TeamListComponent {
  selectedTeam: any;
  teams:Team[]
  constructor(public navCtrl: NavController, public navParams: NavParams,public teamService:TeamService,
              public modalCtrl:ModalController) {
    // If we navigated to this page, we will have an item available as a nav param
    
  }
  showTeamData(team:Team){
    let teamDataModal=this.modalCtrl.create(TeamDataComponent,{team:team});
    teamDataModal.present();
  }
  ngOnInit(){
        let teams=this.navParams.get('competition').teams;
        this.teams=teams;
  }
}
