import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Training } from 'src/app/models/training';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-training-form',
  templateUrl: './training-form.page.html',
  styleUrls: ['./training-form.page.scss'],
})
export class TrainingFormPage implements OnInit {
  public title: string = 'Entrenamiento';
  public runners: User[] = [];
  public runnersSelected: User[] = [];
  public form: FormGroup;
  public start_time: Date;
  public mode: string;
  public loading: boolean = false;
  public training: Training;
  public currentDate = new Date().toISOString();
  public isPopoverOpenEndDate: boolean = false;
  public recurrenceOptions = [
    {
      value: 'daily',
      label: 'Diario',
    },
    {
      value: 'weekly',
      label: 'Semanal',
    },
    {
      value: 'monthly',
      label: 'Mensual',
    },
    {
      value: 'yearly',
      label: 'Anual',
    },
  ];
  constructor(
    private fb: FormBuilder,
    private utilities: UtilitiesService,
    private apiService: ApiService,
    private navCtrl: NavController
  ) {
    this.mode = history.state.mode;
    if (this.mode === 'edit') {
      this.training = history.state.training;
    }
  }

  ngOnInit() {
    this.formInit();
    if (this.mode === 'edit') {
      this.form.patchValue(this.training);
      this.runnersSelected = this.training['training_report'].map(
        (item) => item.user_id
      );
    }
  }

  ionViewDidEnter() {
    this.loadRunners();
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
      },
      complete: () => {},
    });
  }

  /**
   * Cerrar modal de fecha y asignar fecha al formulario
   */
  closePopoverEndDate() {
    this.form.patchValue({ start_time: this.start_time });
    this.isPopoverOpenEndDate = false;
  }

  /**
   * Inicializar formulario
   */
  public formInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      start_time: ['', Validators.required],
      recurrence: ['', Validators.required],
      runners: [''],
    });
  }

  /**
   * Abrir modal para fecha
   */
  openPopoverEndDate() {
    this.isPopoverOpenEndDate = true;
  }

  /**
   * Guardar entrenamiento
   * @returns
   */
  public saveTraining() {
    this.form.patchValue({ runners: this.runnersSelected });

    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return this.utilities.showToast('Revise el formulario');
    }

    this.loading = true;

    if (
      this.mode === 'edit' &&
      this.training &&
      this.training.id !== undefined
    ) {
      this.apiService
        .updateEntity('updateTraining', this.training.id, this.form.value)
        .subscribe({
          next: (data) => {
            if (data.status === 1) {
              this.utilities.showToast(
                'Entrenamiento actualizado correctamente'
              );
              this.navCtrl.navigateRoot('/home-trainer');
              this.mode = '';
            }
            this.mode = '';
          },
          error: () => {
            this.loading = false;
          },
          complete: () => {
            this.loading = false;
          },
        });
    } else if (this.mode === 'register') {
      this.apiService.addEntity('addTraining', this.form.value).subscribe({
        next: (data) => {
          if (data.status === 1) {
            this.utilities.showToast('Entrenamiento registrado correctamente');
            this.navCtrl.navigateRoot('/home-trainer');
            this.mode = '';
          }
        },
        error: (err) => {
          this.loading = false;
          console.error(err);
        },
        complete: () => {
          this.loading = false;
        },
      });
    }
  }
}
