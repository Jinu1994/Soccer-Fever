import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController,Loading,App } from 'ionic-angular';
import {Team} from '../teams/team'
@Component({
  selector: 'group-league-table',
  templateUrl: 'groupLeagueTable.html',
})
export class GroupLeagueTableComponent {
 loader:Loading;
 groupLeagueTableEntries:any;
 teams:Team[];
  constructor(public navCtrl: NavController,public appCtrl:App, public navParams: NavParams,public loadingCtrl:LoadingController) {
    // If we navigated to this page, we will have a competition available as a nav param
   
  }


  ngOnInit(){
    let tableEntries=this.navParams.get('groupData');
    this.groupLeagueTableEntries=tableEntries;
  }
}
