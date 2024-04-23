import { Component, NgZone, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Training } from 'src/app/models/training';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-home-trainer',
  templateUrl: './home-trainer.page.html',
  styleUrls: ['./home-trainer.page.scss'],
})
export class HomeTrainerPage implements OnInit {
  public runners: User[] = [];
  public trainings: Training[] = [];
  public title: string = 'Inicio';
  public flag: any = 1;
  public loading: boolean = true;
  public data: any;

  constructor(
    private apiService: ApiService,
    private navCtrl: NavController,
    private utilities: UtilitiesService
  ) {}

  ngOnInit() {}

  async ionViewDidEnter() {
    this.loadRunners();
    this.loadTrainings();
  }

  /**
   * Manejador de segment
   * @param event
   */
  public handleSegment(event) {
    this.flag = event.detail.value;
  }

  /**
   * Cargar listado de corredores
   */
  public loadRunners() {
    this.apiService.getEntity('runners').subscribe({
      next: (data) => {
        this.runners = data.runners;
      },
      error: (err) => {
        console.error(err);
        this.utilities.showToast('Error al obtener los datos de corredores');
      },
      complete: () => {},
    });
  }

  /**
   * Cargar listado de entrenamientos
   */
  public loadTrainings() {
    this.apiService.getEntity('trainings').subscribe({
      next: (data) => {
        this.trainings = data.trainings;
        this.loading = false;
        this.setChartData();
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.utilities.showToast(
          'Error al obtener los datos de entrenamientos'
        );
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  /**
   * Ir a formulario de corredor
   */
  public goToRunnerForm() {
    this.navCtrl.navigateForward('/runner-form', {
      state: {
        mode: 'register',
      },
    });
  }

  /**
   * Ir a formulario de entrenamiento
   */
  public goToTrainingForm() {
    this.navCtrl.navigateForward('/training-form', {
      state: {
        mode: 'register',
      },
    });
  }

  /**
   * Formatear los datos para mostrarlos en una gráfica
   */
  public setChartData() {
    let labels = this.trainings.map((item) => item.name);
    let dataset = this.trainings.map((item) => {
      // Acumulamos en acc la suma de las distancias, si fuera null aun, lo contamos como 0
      let sum = item['training_report'].reduce(
        (acc, report) => acc + (report.distance || 0),
        0 // valor inicial para acc
      );
      return sum / item['training_report'].length;
    });

    this.data = {
      labels: labels,
      datasets: [
        {
          label: 'Distancia media',
          data: dataset,
          fill: false,
          backgroundColor: '#667b93',
        },
      ],
    };
  }
}
