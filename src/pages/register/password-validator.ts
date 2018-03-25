import {FormGroup} from '@angular/forms';

export class PasswordValidator {
    static isMatching(group:FormGroup){
        var password=group.controls['password'].value;
        var confirmPassword=group.controls['confirmPassword'].value;
        if(password!=confirmPassword){
            group.controls['confirmPassword'].setErrors({MatchPassword:true});
        }
    }
}