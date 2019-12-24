import { AbstractControl } from '@angular/forms';

export function ValidateDate(control: AbstractControl) {
    if (control.value < new Date().toISOString()) {
        return { validDate: true };
    }
    return null;
}
