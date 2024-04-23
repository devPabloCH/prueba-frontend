import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { TrainingReport } from 'src/app/models/training-report';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-home-runner',
  templateUrl: './home-runner.page.html',
  styleUrls: ['./home-runner.page.scss'],
})
export class HomeRunnerPage implements OnInit {
  public user: User;
  public title: string = 'Inicio';
  public flag: any = 1;
  public loading: boolean = true;
  public trainings: TrainingReport[] = [];

  constructor(
    private storage: Storage,
    private utilities: UtilitiesService,
    private apiService: ApiService
  ) {
    this.getUser();
  }

  ngOnInit() {}

  ionViewDidEnter() {
    this.loadUserTrainings();
  }

  /**
   * Obtener datos del usuario actual
   */
  public getUser() {
    this.storage.get('user').then((user) => {
      this.user = user;
    });
  }

  /**
   * Manejador de segment
   * @param event
   */
  public handleSegment(event) {
    this.flag = event.detail.value;
  }

  /**
   * Obtener listado de entrenamientos asignados al usuario actual
   */
  public loadUserTrainings() {
    this.apiService.getEntity('userTrainingReports').subscribe({
      next: (data) => {
        if (data.status === 1) {
          this.trainings = data.training_reports;
        }
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
