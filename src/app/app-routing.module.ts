import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormContainerComponent } from './modules/sample-providers/routes/form-container/form-container.component';
import { SubmissionSuccessComponent } from './modules/sample-providers/routes/submissionSuccess';

const routes: Routes = [
  { path: '', component: FormContainerComponent },
  { path: 'success', component: SubmissionSuccessComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
