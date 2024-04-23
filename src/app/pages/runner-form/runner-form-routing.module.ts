import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RunnerFormPage } from './runner-form.page';

const routes: Routes = [
  {
    path: '',
    component: RunnerFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RunnerFormPageRoutingModule {}
