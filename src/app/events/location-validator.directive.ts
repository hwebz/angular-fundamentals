import { Directive } from "@angular/core";
import { FormGroup, ValidationErrors, Validator } from "@angular/forms";

@Directive({
  selector: '[validateLocation]',
})
export class LocationValidator implements Validator {
  validate(formGroup: FormGroup): ValidationErrors | null {
    let addressControl = formGroup.controls['address'];
    let cityControl = formGroup.controls['city'];
    let countryControl = formGroup.controls['country'];
    let onlineUrlControl = (<FormGroup> formGroup.root).controls['onlineUrls'];

    if (
      (onlineUrlControl && addressControl.value) ||
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