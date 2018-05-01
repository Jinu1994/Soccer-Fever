import {Http,Response,Headers} from '@angular/http';
import {Login} from './login';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthenticationService{
    public constructor(private http:Http,private storage:Storage){

    }

    authenticateLogin(login:Login){
        return this.http.post("https://stark-eyrie-68076.herokuapp.com/users/login",{login})
            .map(response=>{
                if(response)
                this.storage.set('token',response.headers.get('X-Auth'));
                this.storage.set('user',response.json().user);
                return response.json();
            }).catch((error)=>{
                throw error;
              });

    }
    
}