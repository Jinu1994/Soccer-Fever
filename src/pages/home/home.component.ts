import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {FixtureService} from '../fixtures/fixture.service'
import { Storage } from '@ionic/storage';

@Component({
    selector: 'home',
    templateUrl: 'home.html',
    providers:[FixtureService]
})
export class HomeComponent {

    public constructor(private navController:NavController,private fixtureService:FixtureService,
    private storage:Storage){

    }

    ngOnInit(){
        this.storage.set("Name","Jinu");
    }
    displayStorage(){
       this.storage.get('Name').then(name=>{
           console.log(name);
       })
    }
}