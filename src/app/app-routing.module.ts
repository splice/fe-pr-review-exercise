import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormContainerComponent } from './modules/sample-providers/routes/form-container/form-container.component';

const routes: Routes = [{ path: '', component: FormContainerComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
