import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { TrainingsComponent } from './trainings/trainings.component';
import { RunnersComponent } from './runners/runners.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { UserTrainingsComponent } from './user-trainings/user-trainings.component';
import { TrainingUsersComponent } from './training-users/training-users.component';

@NgModule({
  imports: [CommonModule, ConfirmDialogModule, ConfirmPopupModule],
  declarations: [
    HeaderComponent,
    TrainingsComponent,
    RunnersComponent,
    UserTrainingsComponent,
    TrainingUsersComponent,
  ],
  exports: [
    HeaderComponent,
    TrainingsComponent,
    RunnersComponent,
    UserTrainingsComponent,
    TrainingUsersComponent,
  ],
  providers: [ConfirmationService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentsModule {}
