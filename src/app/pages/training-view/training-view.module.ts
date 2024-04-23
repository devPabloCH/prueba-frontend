import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrainingViewPageRoutingModule } from './training-view-routing.module';

import { TrainingViewPage } from './training-view.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    TrainingViewPageRoutingModule,
  ],
  declarations: [TrainingViewPage],
})
export class TrainingViewPageModule {}
