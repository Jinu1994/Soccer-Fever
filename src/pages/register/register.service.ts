import { Http, Response,Headers }  from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Team} from './team';
import {Injectable} from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class RegistrationService{

    public constructor(private http:Http,
        private storage:Storage){

    }
    registerUser(newUser){
        return this.http.post("https://stark-eyrie-68076.herokuapp.com/users",{newUser})
        .map((response) => {
                
                this.storage.set('token',response.headers.get('X-Auth'));
                this.storage.set('username',newUser.username);
                this.storage.set('password',newUser.password);
                response.json()
            })
        .catch((error:any)=>Observable.throw(this.handleError(error))); 
    }

   private handleError(error:Response|any){
        console.log(error);
    }
}