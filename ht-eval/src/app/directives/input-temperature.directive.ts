import { FormControl } from '@angular/forms';
import { TemperatureType } from '../temperature/temperature.cont';

/**
 * Validator for input temperature which validates a number and a unit type
 * This validator automatically sets the field if the first letter matches a known type
 *
 * @param formControl
 */
export function inputTemperatureValidator(formControl: FormControl) {
  let invalid: boolean = true;
  let temperatureValue: number;
  if (formControl.dirty) {
    temperatureValue = Number(formControl.value);
    if (!isNaN(temperatureValue)) {
      let newValue = `${temperatureValue}`;
      formControl.setValue(newValue);
      invalid = false;
    }
  }
    return invalid ? {'invalidTemperatureInput': {value: `${temperatureValue}`}} : null;
}

/**
 * Validator for target units which validates the unit type
 * This validator automatically sets the field if the first letter matches a known type
 *
 * @param formControl
 */
export function unitValidator(formControl: FormControl) {
  let invalid: boolean = true;
  let temperatureType: string;
  if (formControl.dirty) {
    temperatureType = formControl.value in TemperatureType ? TemperatureType[formControl.value] : null;
    if (temperatureType && formControl.value.length < 2) {
      formControl.setValue(temperatureType);
      invalid = false;
    }
  }
  return invalid ? {'invalidTemperatureUnit': {value: temperatureType}} : null;
}
