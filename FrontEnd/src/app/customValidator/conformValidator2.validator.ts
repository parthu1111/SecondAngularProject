import { AbstractControl, ValidationErrors } from '@angular/forms'
 
export function matchPassword(control: AbstractControl): ValidationErrors {
    
    const password=control.value;
    const conf_password=control.get("rep_password")?.value;
    console.log("custom validation 2 run password is :"+password);
    console.log(password);
    if(password==conf_password){
        return {ismatch:true}
    }
    else{
        return {ismatch:false};
    }
}