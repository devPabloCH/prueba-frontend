import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Training } from 'src/app/models/training';
import { ApiService } from 'src/app/services/api.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.scss'],
})
export class TrainingsComponent implements OnInit {
  @Input() trainings: Training[] = [];
  @Output() trainingDeleted: EventEmitter<void> = new EventEmitter<void>();

  public loading: boolean = false;

  constructor(
    private alertCtrl: AlertController,
    private apiService: ApiService,
    private utilities: UtilitiesService,
    private navCtrl: NavController
  ) {}
  ngOnInit() {}

  /**
   * Mostrar modal de aviso al eliminar entrenamiento
   * @param training
   */
  async presentAlert(training: Training) {
    const alert = await this.alertCtrl.create({
      header: '¡Aviso!',
      message: '¿Está seguro que desea eliminar este entrenamiento?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {},
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.deleteTraining(training);
          },
        },
      ],
    });

    await alert.present();
  }

  /**
   * Eliminar usuario seleccionado
   * @param user
   */
  public deleteTraining(training: Training) {
    this.apiService.deleteEntity('deleteTraining', training.id).subscribe({
      next: (data) => {
        if (data.status === 1) {
          this.utilities.showToast('Entrenamiento eliminado correctamente');
          this.trainingDeleted.emit();
        }
      },
      error: () => {},
      complete: () => {},
    });
  }

  /**
   * Editar datos de usuario seleccionado
   * @param user
   */
  public editTraining(training) {
    this.navCtrl.navigateForward('/training-form', {
      state: {
        training: training,
        mode: 'edit',
      },
    });
  }

  /**
   * Ver entrenamientos asignados a un usuario y sus datos
   * @param user
   */
  public viewTraining(training) {
    this.navCtrl.navigateForward('/training-view', {
      state: {
        training: training,
      },
    });
  }
}
