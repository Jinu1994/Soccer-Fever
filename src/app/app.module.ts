import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Globals } from './global';
import {ScrollableTabs} from '../assets/scrollable-tabs/scrollable-tabs'
import { CompetitionList } from '../pages/competitions/competitionList.component';
import { FixtureList } from '../pages/fixtures/fixtureList.component';
import { TeamList } from '../pages/teams/teamList.component';
//import { TeamDataPage } from '../pages/teams/teamData.component';
import { CompetitionService } from '../pages/competitions/competition.service';
import { LeagueTablePage } from '../pages/leagueTable/leagueTable.component';
import { GroupLeagueTablePage } from '../pages/leagueTable/groupLeagueTable.component';
import {MatchdayPage} from '../pages/matchdays/matchday.component'    
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SuperTabsModule } from 'ionic2-super-tabs';
// import {ChartModule} from 'angular2-highcharts'
// import * as highcharts from 'HighCharts'

import { HttpModule } from '@angular/http';
@NgModule({
  declarations: [
    MyApp,
    CompetitionList,
    FixtureList,
    TeamList,
    //TeamDataPage,
    MatchdayPage,
    LeagueTablePage,
    GroupLeagueTablePage,
    ScrollableTabs
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    SuperTabsModule.forRoot(),
    //ChartModule.forRoot(highcharts)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CompetitionList,
    FixtureList,
    TeamList,
    //TeamDataPage,
    MatchdayPage,
    LeagueTablePage,
    GroupLeagueTablePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Globals,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CompetitionService
  ]
})
export class AppModule {}
