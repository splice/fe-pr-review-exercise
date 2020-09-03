import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormContainerComponent } from './routes/form-container/form-container.component';
import { SubmissionFormComponent } from './components/submission-form/submission-form.component';
import { FormControlComponent } from './components/form-control/form-control.component';

@NgModule({
  declarations: [
    FormContainerComponent,
    SubmissionFormComponent,
    FormControlComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
})
export class SampleProvidersModule {}
