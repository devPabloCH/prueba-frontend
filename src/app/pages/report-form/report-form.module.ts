import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportFormPageRoutingModule } from './report-form-routing.module';

import { ReportFormPage } from './report-form.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    ReactiveFormsModule,
    IonicModule,
    ReportFormPageRoutingModule,
  ],
  declarations: [ReportFormPage],
})
export class ReportFormPageModule {}
