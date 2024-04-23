import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrainingViewPage } from './training-view.page';

const routes: Routes = [
  {
    path: '',
    component: TrainingViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingViewPageRoutingModule {}
