import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Simple Calculator';
  result = 0;
  isComputed = false;
  selectedOperator = '';
  calculationForm;
  errorMessage = '';

  operators = [
  {
    id: 1,
    name: 'Add',
    sign: '+'
  },
  {
    id: 2,
    name: 'Subtract',
    sign: '-'
  },
  {
    id: 3,
    name: 'Multiply',
    sign: '*'
  },
  {
    id: 4,
    name: 'Divide',
    sign: '/'
  }];

  constructor(private formBuilder: FormBuilder) {
    this.calculationForm = this.formBuilder.group({
      operand1: 0,
      operand2: 0,
      operation: ''
    });
  }

  onChange() {
    this.isComputed = false;
    this.result = 0;
    this.errorMessage = '';
  }

  onSubmit(calculationData) {
    this.result = this.performCalculation(
                        calculationData.operand1,
                        calculationData.operand2,
                        calculationData.operation);
    if (!isNaN(this.result)) {
      this.isComputed = true;
      this.errorMessage = '';
    } else {
      this.isComputed = false;
      this.errorMessage = 'Invalid Operation';
    }

  }

  validateOperands(op1, op2) {
    if (typeof op1 === 'number' && typeof op2 === 'number') {
      return true;
    }
    return false;
  }

  performCalculation(op1, op2, operation) {
    let res = NaN;
    const isValid = this.validateOperands(op1, op2);
    console.log(isValid);
    if (isValid && operation !== '') {
      switch (operation) {
        case '+':
          res = op1 + op2;
          break;
        case '-':
          res = op1 - op2;
          break;
        case '*':
          res = op1 * op2;
          break;
        case '/':
          if (op2 !== 0) {
            res = op1 / op2;
          } else {
            res = NaN;
          }
          break;
        default:
          break;
      }
    }
    return res;
  }

}
