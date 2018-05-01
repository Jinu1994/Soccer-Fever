export class Login{
    id:number;
    email:string;
    password:string;
    constructor(loginInfo:{email:String,password:String}){
        Object.assign(this,loginInfo);
    }
}