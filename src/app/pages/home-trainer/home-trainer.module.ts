import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeTrainerPageRoutingModule } from './home-trainer-routing.module';

import { HomeTrainerPage } from './home-trainer.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { ChartModule } from 'primeng/chart';

@NgModule({
  imports: [
    CommonModule,
    ChartModule,
    FormsModule,
    ComponentsModule,
    IonicModule,
    HomeTrainerPageRoutingModule,
  ],
  declarations: [HomeTrainerPage],
})
export class HomeTrainerPageModule {}
