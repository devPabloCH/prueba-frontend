import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { CalendarModule } from 'primeng/calendar';
import { TrainingFormPageRoutingModule } from './training-form-routing.module';
import { TrainingFormPage } from './training-form.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    CalendarModule,
    IonicModule,
    TrainingFormPageRoutingModule,
  ],
  declarations: [TrainingFormPage],
})
export class TrainingFormPageModule {}
