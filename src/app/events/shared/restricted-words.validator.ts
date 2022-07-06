import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const restrictedWords = (words: any): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!words) return null;
    const invalidWords = words.map((w: string) => control.value.includes(w) ? w : null).filter((w: string | null) => w);
    return invalidWords.length > 0 ? { restrictedWords: invalidWords.join(', ') } : null;
  }
}