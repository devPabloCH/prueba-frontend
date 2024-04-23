import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeRunnerPage } from './home-runner.page';

const routes: Routes = [
  {
    path: '',
    component: HomeRunnerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRunnerPageRoutingModule {}
