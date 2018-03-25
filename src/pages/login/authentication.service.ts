import {Http,Response,Headers} from '@angular/http';
import {Login} from './login';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationService{
    public constructor(private http:Http){

    }

    authenticateLogin(login:Login){
        return this.http.post("",login)
            .map(response=>response.json());

    }
    
}