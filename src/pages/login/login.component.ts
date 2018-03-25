import {Component} from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import {AuthenticationService} from './authentication.service';
import { NavController, NavParams,LoadingController,Loading,App } from 'ionic-angular';
import {MainTabsComponent} from '../main-tabs/main-tabs.component';
import {HomeComponent} from '../home/home.component';
import {RegistrationComponent} from '../register/register.component';

@Component({
    selector: 'login',
    templateUrl: 'login.html',
    providers:[AuthenticationService]
})
export class LoginComponent {
    loginForm:FormGroup;
    submitAttempted:boolean=false;
    public constructor(private formBuilder:FormBuilder,private authenticationService:AuthenticationService
                        ,private navCtrl:NavController){
        this.loginForm=formBuilder.group({
            username:['',Validators.required],
            password:['',Validators.required]
        })
    }
    loginUser(){
        this.submitAttempted=true;
        if(this.loginForm.valid)
            this.navCtrl.setRoot(HomeComponent);
    }
    registerUser(){
        this.navCtrl.setRoot(RegistrationComponent);
    }
    get username(){return this.loginForm.controls.username;}
    get password(){return this.loginForm.controls.password; }

}