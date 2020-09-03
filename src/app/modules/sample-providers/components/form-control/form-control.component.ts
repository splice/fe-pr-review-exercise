import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-control',
  template: `
    <div class="form-control" *ngIf="textarea; else inputform">
      <label>{{ label }}</label>
      <textarea [formControl]="control"></textarea>
    </div>
    <ng-template #inputform>
      <div class="form-control">
        <label>{{ label }}</label>
        <input type="text" [formControl]="control" />
      </div>
    </ng-template>
  `,
})
export class FormControlComponent {
  @Input() control: AbstractControl;
  @Input() label: string;
  @Input() textarea: boolean;
  // TODO add @Input checkbox, @Input file, @Input radio etc
}
