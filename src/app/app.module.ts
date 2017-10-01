import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Globals } from './global';
import {ScrollableTabs} from '../assets/scrollable-tabs/scrollable-tabs'
import { CompetitionListComponent } from '../pages/competitions/competition-list.component';
import { FixtureListComponent } from '../pages/fixtures/fixture-list.component';
import { TeamListComponent } from '../pages/teams/team-list.component';
//import { TeamDataPage } from '../pages/teams/teamData.component';
import { CompetitionService } from '../pages/competitions/competition.service';
import { LeagueTableComponent } from '../pages/leagueTable/leagueTable.component';
import { GroupLeagueTableComponent } from '../pages/groupLeagueTable/groupLeagueTable.component';
import {MatchdayComponent} from '../pages/matchdays/matchday.component';
import {MainTabsComponent} from '../pages/main-tabs/main-tabs.component';    
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SuperTabsModule } from 'ionic2-super-tabs';
// import {ChartModule} from 'angular2-highcharts'
// import * as highcharts from 'HighCharts'

import { HttpModule } from '@angular/http';
@NgModule({
  declarations: [
    MyApp,
    MainTabsComponent,
    CompetitionListComponent,
    FixtureListComponent,
    TeamListComponent,
    //TeamDataPage,
    MatchdayComponent,
    LeagueTableComponent,
    GroupLeagueTableComponent,
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
    MainTabsComponent,
    CompetitionListComponent,
    FixtureListComponent,
    TeamListComponent,
    //TeamDataPage,
    MatchdayComponent,
    LeagueTableComponent,
    GroupLeagueTableComponent
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
