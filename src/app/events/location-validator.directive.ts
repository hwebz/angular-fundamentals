import { Directive } from "@angular/core";
import { FormGroup, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";

@Directive({
  selector: '[validateLocation]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: LocationValidator,
    multi: true
  }]
})
export class LocationValidator implements Validator {
  validate(formGroup: FormGroup): ValidationErrors | null {
    let addressControl = formGroup.controls['address'];
    let cityControl = formGroup.controls['city'];
    let countryControl = formGroup.controls['country'];
    let onlineUrlControl = (<FormGroup> formGroup.root).controls['onlineUrl'];
    
    if (
      (onlineUrlControl && onlineUrlControl.value) ||
      (
        addressControl && addressControl.value &&
        cityControl && cityControl.value &&
        countryControl && countryControl.value
      )
    ) {
      return null;
    } else {
      return {
        validateLocation: false
      }
    }
  }
}