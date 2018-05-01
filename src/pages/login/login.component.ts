import {Component} from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import {AuthenticationService} from './login.service';
import { NavController, NavParams,LoadingController,Loading,App } from 'ionic-angular';
import {MainTabsComponent} from '../main-tabs/main-tabs.component';
import {HomeComponent} from '../home/home.component';
import {RegistrationComponent} from '../register/register.component';
import {Login} from './login';

@Component({
    selector: 'login',
    templateUrl: 'login.html',
    providers:[AuthenticationService]
})
export class LoginComponent {
    loginForm:FormGroup;
    submitAttempted:boolean=false;
    loginFailed:boolean=false;
    public constructor(private formBuilder:FormBuilder,private authenticationService:AuthenticationService
                        ,private navCtrl:NavController){
        this.loginForm=formBuilder.group({
            email:['',Validators.required],
            password:['',Validators.required]
        })
    }
    loginUser(){
        this.submitAttempted=true;
        if(this.loginForm.valid){
            var login=new Login({
                email:this.loginForm.controls.email.value,
                password:this.loginForm.controls.password.value
            });
            this.authenticationService.authenticateLogin(login)
            .subscribe((response)=>{
                    if(response.success)
                        this.navCtrl.setRoot(MainTabsComponent);
            },(error)=>{
                 this.loginFailed=true;
            });
            
        }
            
    }
    registerUser(){
        this.navCtrl.setRoot(RegistrationComponent);
    }
    get email(){return this.loginForm.controls.email;}
    get password(){return this.loginForm.controls.password; }

}