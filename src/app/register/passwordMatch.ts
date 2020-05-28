import { AbstractControl, ValidatorFn } from "@angular/forms";

export function passwordMatch(control: AbstractControl): { [key: string]: boolean } | null {
  let password = control.get('password');
  let verifiedPassword = control.get('verifiedPassword');
  if (password.pristine || verifiedPassword.pristine) {
    return null;
  }
  return password && verifiedPassword && password.value !== verifiedPassword.value
          ? {'mismatch':true} : null;
}
