import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeRunnerPageRoutingModule } from './home-runner-routing.module';

import { HomeRunnerPage } from './home-runner.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    IonicModule,
    HomeRunnerPageRoutingModule,
  ],
  declarations: [HomeRunnerPage],
})
export class HomeRunnerPageModule {}
