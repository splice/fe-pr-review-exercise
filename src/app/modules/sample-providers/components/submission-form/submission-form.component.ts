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
  // demo file name
  file: File;

  @ViewChild('player', { read: ElementRef }) player: ElementRef;

  @Output()
  submitForm = new EventEmitter<any>();

  @Input()
  onChange = (file: File) => {};

  @HostListener('change', ['$event.target.files'])
  emitFiles(event: FileList) {
    this.file = event && event.item(0);
    this.addAudioFile();
    this.onChange(this.file);
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {}

  /** @ignore */
  writeValue(value) {
    if (value === null && this.file) {
      this.file = null;
    }
  }

  addAudioFile() {
    this.player.nativeElement.src = URL.createObjectURL(this.file);
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
