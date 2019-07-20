import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {
  inputTemperatureValidator,
  unitValidator
} from './directives/input-temperature.directive';
import {TemperatureConverter, TemperatureType} from './temperature/temperature.cont';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Heat and Temperature Conversion';
  quizForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  /**
   * Setup the form group
   */
  ngOnInit(): void {
    this.quizForm = this.formBuilder.group({
      inputUnitField: [{value: '', disabled: false}, [Validators.required, unitValidator]],
      inputTemperatureField: [{value: '', disabled: false}, [Validators.required, inputTemperatureValidator]],
      targetUnitField: [{value: '', disabled: false}, [Validators.required, unitValidator]],
      evaluationField: [{value: '', disabled: true}, Validators.nullValidator]
    })
  }

  /**
   * sets the Output field depending on field validation and or answer correctness
   */
  get output(): string {
    let message = null;
    if (this.quizForm.valid) {
      let inputUnit = TemperatureType[this.quizForm.controls.inputUnitField.value];
      let inputTemperature = Number(this.quizForm.controls.inputTemperatureField.value);
      let targetUnit = TemperatureType[this.quizForm.controls.targetUnitField.value];
      message = Number(TemperatureConverter[inputUnit][targetUnit](inputTemperature));
    }
    return message;
  }
}
