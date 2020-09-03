import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-control',
  template: `
    <div class="form-control" *ngIf="t; else inputform">
      <label>{{ l }}</label>
      <textarea [formControl]="c"></textarea>
    </div>
    <ng-template #inputform>
      <div class="form-control">
        <label>{{ l }}</label>
        <input type="text" [formControl]="c" />
      </div>
    </ng-template>
  `,
  styleUrls: ['./form-control.component.scss'],
})
export class FormControlComponent {
  @Input() c: AbstractControl; // control
  @Input() l: string; // label
  @Input() t: boolean; // is textarea
  // TODO add @Input checkbox, @Input file, @Input radio etc
}
