export class User{
    
    id:number;
    name:string;
    userName:string;
    email:string;
    password:string;
    competitionId:number;
    teamName:string;
    constructor(newUser:{name:string,userName:string,emailAddress:string,passwordEntered:string,competition:number,
        team:string}){
                this.name=newUser.name;
                this.userName=newUser.userName;
                this.email=newUser.emailAddress;
                this.password=newUser.passwordEntered;
                this.competitionId=newUser.competition;
                this.teamName=newUser.team;
    }
}