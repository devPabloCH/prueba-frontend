import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeTrainerPage } from './home-trainer.page';

const routes: Routes = [
  {
    path: '',
    component: HomeTrainerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeTrainerPageRoutingModule {}
