import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RunnerFormPageRoutingModule } from './runner-form-routing.module';

import { RunnerFormPage } from './runner-form.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    IonicModule,
    RunnerFormPageRoutingModule,
  ],
  declarations: [RunnerFormPage],
})
export class RunnerFormPageModule {}
