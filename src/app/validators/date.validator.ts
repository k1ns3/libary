import { AbstractControl } from '@angular/forms';

export function ValidateDate(control: AbstractControl) {
    let selectDate = control.value;
    if (selectDate < new Date().toISOString()) {
        return { validDate: true };
    }
    return null;
}