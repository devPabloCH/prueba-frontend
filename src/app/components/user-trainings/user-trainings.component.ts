import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TrainingReport } from 'src/app/models/training-report';

@Component({
  selector: 'app-user-trainings',
  templateUrl: './user-trainings.component.html',
  styleUrls: ['./user-trainings.component.scss'],
})
export class UserTrainingsComponent implements OnInit {
  @Input() trainings: TrainingReport[] = [];

  constructor(private navCtrl: NavController) {}

  ngOnInit() {}

  /**
   * Añadir reporte de usuario a un entrenamiento previamente asignado
   */
  public addReport(training, mode: string) {
    this.navCtrl.navigateForward('/report-form', {
      state: {
        training: training,
        mode: mode,
      },
    });
  }
}
