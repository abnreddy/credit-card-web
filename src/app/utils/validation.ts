import { AbstractControl, ValidatorFn } from '@angular/forms';

export default class Validation {
  static validate(controlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      let control = controls.get(controlName);
       var regex = new RegExp("^[0-9]{19}$");
       let value = control?.value.replace(/\s/g, "")
          if (!regex.test(value)){
               controls.get(controlName)?.setErrors({ matching: true });
               return controls;
             }
          return luhnCheck(value, controls, controlName);
    };
  }
}

function luhnCheck(val: any, controls: AbstractControl, controlName: string) {
    var sum = 0;
    for (var i = 0; i < val.length; i++) {
        var intVal = parseInt(val.substr(i, 1));
        if (i % 2 == 0) {
            intVal *= 2;
            if (intVal > 9) {
                intVal = 1 + (intVal % 10);
            }
        }
        sum += intVal;
    }
    if((sum % 10) == 0){
       controls.get(controlName)?.setErrors({ matching: true });
       return controls;
    }
    return null;

}
