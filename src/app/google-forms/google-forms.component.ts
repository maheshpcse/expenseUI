import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as _ from 'underscore';
import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'app-google-forms',
  templateUrl: './google-forms.component.html',
  styleUrls: ['./google-forms.component.css']
})
export class GoogleFormsComponent implements OnInit {

  inputForm: FormGroup;
  inputCards: any = [1];

  inputFields: any = [
    { name: 'text', type: 'text', icon: 'fa-file-text' },
    { name: 'number', type: 'number', icon: 'fa-phone' },
    { name: 'file', type: 'file', icon: 'fa-file' },
    { name: 'radio', type: 'radio', icon: 'fa-dot-circle-o' },
    { name: 'checkbox', type: 'checkbox', icon: 'fa-check-square-o' },
    { name: 'dropdown', type: 'dropdown', icon: 'fa-angle-down' }
  ];

  inputsArr: any = [
    { name: 'text', type: 'text', icon: 'fa-file-text' }
  ];

  indexJ: any = 0;

  inputFormArr: FormGroup;

  phoneNum: any = '';

  allalerts: any = [];
  tempAllAlerts: any = [];

  employeesList: any = [];
  headers: any = [];

  constructor(
    public fb: FormBuilder
  ) { }

  ngOnInit() {
    this.inputForm = this.fb.group({
      forms: new FormArray([this.initForm()])
    })
    this.inputFormArr = this.fb.group({
      inputs: new FormArray([this.initFormArr()])
    })
    this.getCode();
  }

  initForm() {
    return this.fb.group({
      // inputName: new FormControl('', Validators.required),
      inputType: new FormControl(null, Validators.required)
    })
  }

  addCard(i: any, item: any) {
    console.log(i, item);
    i = this.inputCards.length;
    this.inputCards.push(i);
  }

  removeCard(i: any, item: any) {
    console.log(i, item);
    const index = this.inputCards.indexOf(item);
    if (index > -1) {
      this.inputCards.splice(index, 1);
    }
  }

  onSelectInput(i: any, j: any, items: any) {
    console.log(i, j, items);
    this.indexJ = this.inputCards.length;
    console.log(this.inputForm.controls['forms'].value[0]['inputType']);
    let filterItem = _.filter(this.inputFields, (e: any) => {
      return e.name === this.inputForm.controls['forms'].value[0]['inputType']
    })
    console.log("filter item issssss", filterItem);
    this.inputsArr.push(filterItem[0]);
    console.log('selected inputs array isssssss', this.inputsArr);
  }

  initFormArr() {
    return this.fb.group({
      inputTextName: new FormControl('', Validators.required),
      inputNumberName: new FormControl('', Validators.required),
      inputFileName: new FormControl('', Validators.required),
      inputRadioName: new FormControl('', Validators.required),
      inputCheckboxName: new FormControl('', Validators.required),
      inputDropdownName: new FormControl('', Validators.required)
    })
  }

  addInput(i: any, input: any) {
    console.log(input, "selected input item isssssss");
    console.log(this.inputFormArr.controls['inputs']);
    const control: any = this.inputFormArr.controls['inputs'] as FormArray;
    control.push(this.initFormArr());
  }

  removeInput(i: any, input: any) {
    const control = this.inputFormArr.controls['inputs'] as FormArray;
    control.removeAt(i);
  }

  getCode() {
    let reports = [{
      emp_id: 'TES001',
      sc_id: 8,
      salary_component: 'Provident Fund Employee',
      amount: 4444
    },
    {
      emp_id: 'TES001',
      sc_id: 9,
      salary_component: 'Professional Tax',
      amount: 5555
    },
    {
      emp_id: 'TES002',
      sc_id: 8,
      salary_component: 'Provident Fund Employee',
      amount: 6666
    },
    {
      emp_id: 'TES002',
      sc_id: 9,
      salary_component: 'Professional Tax',
      amount: 7777
    },
    {
      emp_id: 'TES003',
      sc_id: 8,
      salary_component: 'Provident Fund Employee',
      amount: 8888
    },
    {
      emp_id: 'TES003',
      sc_id: 9,
      salary_component: 'Professional Tax',
      amount: 9999
    }
    ];

    let uniqArr = _.uniq(reports, 'emp_id');

    let groupArr = _.groupBy(reports, 'emp_id');

    let resultArr = [];

    for (let i = 0; i < uniqArr.length; i++) {
      let obj = {};
      this.headers[i] = [];
      const element = uniqArr[i].emp_id;
      this.headers[i].push('emp_id');
      obj['emp_id'] = element;
      for (let j = 0; j < groupArr[element].length; j++) {
        const element1 = groupArr[element][j].salary_component;
        obj[`component_${j + 1}`] = groupArr[element][j].amount;
        this.headers[i].push(element1);
        resultArr.push(obj);
      }
    }

    let filterArr = _.uniq(resultArr, 'emp_id');


    for(let i of filterArr) {
      this.employeesList.push(Object.values(i));
    }

    console.log(this.employeesList);

    console.log(this.headers);
  }

}
