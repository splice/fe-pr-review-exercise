import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  ElementRef,
  ViewChild,
  HostListener,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
} from '@angular/forms';

@Component({
  selector: 'app-submission-form',
  templateUrl: './submission-form.component.html',
  styleUrls: ['./submission-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SubmissionFormComponent,
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubmissionFormComponent implements OnInit, ControlValueAccessor {
  form: FormGroup;

  f: File; // demo file

  @ViewChild('p', { read: ElementRef }) p: ElementRef;

  @Output()
  submitForm = new EventEmitter<any>();

  @Input()
  onChange = (f: File) => {};

  @HostListener('change', ['$event.target.files'])
  emitFiles(e: FileList) {
    this.f = e && e.item(0);
    this.a();
    this.onChange(this.f);
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {}

  /** @ignore */
  writeValue(value) {
    if (value === null && this.f) {
      this.f = null;
    }
  }
  // add audioFile
  a() {
    this.p.nativeElement.src = URL.createObjectURL(this.f);
  }

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    const formData = {
      label_name: ['', Validators.required],
      label_description: ['', [Validators.required, Validators.maxLength(200)]],
      label_contact: ['', [Validators.required, Validators.email]],
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

  public get labelDescription() {
    return this.form.get('label_description');
  }

  public get labelContact() {
    return this.form.get('label_contact');
  }
}
