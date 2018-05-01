import { Component,ViewChild } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController, NavParams,App } from 'ionic-angular';
import {PasswordValidator} from './password-validator';
import {CompetitionService} from '../competitions/competition.service';
import {TeamService} from '../teams/team.service';
import { Team } from '../teams/team';
import { Globals } from '../../app/global';
import { Competition } from '../competitions/competition';
import { User } from './user';
import {RegistrationService} from './register.service';
import {MainTabsComponent} from '../main-tabs/main-tabs.component';

@Component({
    selector:'register-user',
    templateUrl:'register.html',
    providers:[CompetitionService,TeamService,RegistrationService]
})
export class RegistrationComponent{
    registrationForm:FormGroup;
    submitAttempted:boolean=false;
    isDataAvailable:boolean=false;
    chosenCompetition:Competition;
    isCompetitionAvailable:boolean=true;
    public constructor(private navCtrl:NavController,private formBuilder:FormBuilder
                        ,private competitionService:CompetitionService,private teamService:TeamService,
                    private globals:Globals,private registrationService:RegistrationService){
        this.registrationForm=formBuilder.group({
            name:['',Validators.required],
            username:['',Validators.required],
            password:['',Validators.required],
            email:['',Validators.compose([Validators.required,Validators.email])],
            confirmPassword:[''],
            selectedCompetition:[],
            selectedTeam:[]
    },{validator:PasswordValidator.isMatching});
}

registerUser(){
    this.submitAttempted=true;
    if(!this.registrationForm.valid)
        return;
    var newUser={
        name:this.registrationForm.controls.name.value,
        userName:this.registrationForm.controls.username.value,
        emailAddress:this.registrationForm.controls.email.value,
        passwordEntered:this.registrationForm.controls.password.value,
        competition:this.registrationForm.controls.selectedCompetition.value.id,
        team:this.registrationForm.controls.selectedTeam.value.name
    }
    var user=new User(newUser);
    this.registrationService.registerUser(user).subscribe((response)=>{
        this.navCtrl.setRoot(MainTabsComponent);
    });
}
get name(){return this.registrationForm.controls.name}
get username(){return this.registrationForm.controls.username;}
get password(){return this.registrationForm.controls.password; }
get email(){return this.registrationForm.controls.email;}
get confirmPassword(){return this.registrationForm.controls.confirmPassword;}
get selectedCompetition(){return this.registrationForm.controls.selectedCompetition;}
get selectedTeam(){return this.registrationForm.controls.selectedTeam;}



  changeCompetition(competition){
   this.globals.competitionsFetched.next(true);
   
  }
  

    ngOnInit(){
        var self=this;
        this.globals.competitionsFetched.subscribe((value)=>{
            if(value){
                self.chosenCompetition=self.globals.selectedCompetition;
            }
        });
        this.competitionService.getAllCompetitions();
    }
}