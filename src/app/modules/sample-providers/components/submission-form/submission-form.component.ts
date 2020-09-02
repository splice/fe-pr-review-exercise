import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-submission-form',
  templateUrl: './submission-form.component.html',
  styleUrls: ['./submission-form.component.scss'],
})
export class SubmissionFormComponent implements OnInit {
  form: FormGroup;

  @Output()
  submitForm = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    const formData = {
      label_name: ['', Validators.required],
      label_description: ['', Validators.required],
      label_contact: ['', Validators.required],
    };
    this.form = this.formBuilder.group(formData);
  }

  public onSubmit(): void {
    if (this.form.valid) {
      this.submitForm.emit(this.form.value);
      this.form.reset();
    } else {
      console.log('invalid!');
    }
  }
}
