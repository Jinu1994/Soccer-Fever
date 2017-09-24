import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { FixtureListComponent } from '../pages/fixtures/fixture-list.component';
import { TeamListComponent } from '../pages/teams/team-list.component';
import { LeagueTableComponent } from '../pages/leagueTable/leagueTable.component';
import { CompetitionService } from '../pages/competitions/competition.service';
import {Globals} from './global'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Events} from 'ionic-angular'

@Component({
  selector:"soccer-fever",
  templateUrl: 'app.html',
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage = LeagueTableComponent;
  rootParams= {};
  pages: Array<{title: string, component: any}>;
  competitions:any;
  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public globals:Globals,
    private competitionService:CompetitionService,
    private events:Events
  ) {
    this.initializeApp();
    // set our app's pages
    this.pages = [
      { title: 'Fixtures', component: FixtureListComponent },
      { title: 'Teams', component: TeamListComponent },
      { title: 'League Table', component: LeagueTableComponent },
    ];
    this.rootParams={competition:{fixturesLink:"http://www.football-data.org/v1/fixtures"}};
  }
  setGlobals(competitions){
    this.globals.competitions=competitions;
    this.globals.selectedCompetition=competitions.find(competition=>competition.name.startsWith("Premier League 20"));
  }
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

    });

     this.competitionService.getAllCompetitions()
     .subscribe(competitions=>this.setGlobals(competitions))
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.push(page.component,{competition:this.globals.selectedCompetition});
  }
}
