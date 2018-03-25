import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Globals } from './global';
import {ScrollableTabs} from '../assets/scrollable-tabs/scrollable-tabs';
import {HomeComponent} from '../pages/home/home.component';
import {LoginComponent} from '../pages/login/login.component';
import { CompetitionListComponent } from '../pages/competitions/competition-list.component';
import { FixtureListComponent } from '../pages/fixtures/fixture-list.component';
import { TeamListComponent } from '../pages/teams/team-list.component';
import { TeamDataComponent } from '../pages/team-data/team-data.component';
import { CompetitionService } from '../pages/competitions/competition.service';
import { LeagueTableComponent } from '../pages/leagueTable/leagueTable.component';
import { GroupLeagueTableComponent } from '../pages/groupLeagueTable/groupLeagueTable.component';
import {MatchdayComponent} from '../pages/matchdays/matchday.component';
import {MainTabsComponent} from '../pages/main-tabs/main-tabs.component';    
import {RegistrationComponent} from '../pages/register/register.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SuperTabsModule } from 'ionic2-super-tabs';
import {ChartModule} from 'angular2-highcharts';
import * as highcharts from 'HighCharts';
import { IonicStorageModule } from '@ionic/storage';

import { HttpModule } from '@angular/http';
@NgModule({
  declarations: [
    MyApp,
    LoginComponent,
    MainTabsComponent,
    CompetitionListComponent,
    HomeComponent,
    FixtureListComponent,
    TeamListComponent,
    TeamDataComponent,
    MatchdayComponent,
    LeagueTableComponent,
    GroupLeagueTableComponent,
    RegistrationComponent,
    ScrollableTabs
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    SuperTabsModule.forRoot(),
    ChartModule.forRoot(highcharts),
    IonicStorageModule.forRoot()

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginComponent,
    HomeComponent,
    MainTabsComponent,
    CompetitionListComponent,
    FixtureListComponent,
    TeamListComponent,
    TeamDataComponent,
    MatchdayComponent,
    LeagueTableComponent,
    GroupLeagueTableComponent,
    RegistrationComponent
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
