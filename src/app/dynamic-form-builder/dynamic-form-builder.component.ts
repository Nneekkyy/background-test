import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'dynamic-form-builder',
  templateUrl: './dynamic-form-builder.html',
  styleUrls: ['./dynamic-form-builder.scss']
})
export class DynamicFormBuilderComponent implements OnInit {
  @Output() onSubmit = new EventEmitter();
  @Input() fields: any[] = [];
  form!: FormGroup;
  constructor() { }

  ngOnInit() {
    let fieldsCtrls:any = {};

    for (let f of this.fields) {
      if (f.type != 'checkbox') {
        fieldsCtrls[f.name] = new FormControl(f.value || '', Validators.required)
      } else {
        let opts:any = {};
        for (let opt of f.options) {
          opts[opt.key] = new FormControl(opt.value);
        }
        fieldsCtrls[f.name] = new FormGroup(opts)
      }
    }
    this.form = new FormGroup(fieldsCtrls);
  }

  add() {
    this.fields.push({type: 'text',
      name: 'university',
      label: '',
      value: ' ',
      required: false,
      placeholder: 'Например, ВолГУ',})
    console.log(this.fields)
  }

}
