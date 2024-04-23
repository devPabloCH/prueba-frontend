import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Browser } from '@capacitor/browser';
import { Camera, CameraResultType } from '@capacitor/camera';
import { NavController } from '@ionic/angular';
import { TrainingReport } from 'src/app/models/training-report';
import { ApiService } from 'src/app/services/api.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.page.html',
  styleUrls: ['./report-form.page.scss'],
})
export class ReportFormPage implements OnInit {
  public title: string = 'Reporte';
  public form: FormGroup;
  public selectedFile: File | null;
  public selectedImage: string | undefined;
  public countFiles: number = 0;
  public loading: boolean = false;
  public type: string = '';
  public trainingReport: TrainingReport;
  public mode: string = '';
  public ext: string = '';

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private utilities: UtilitiesService,
    private navCtrl: NavController
  ) {
    this.trainingReport = history.state.training;
    this.mode = history.state.mode;
  }

  ngOnInit() {
    this.formInit();
    if (this.mode === 'view') {
      this.ext = this.trainingReport.evidence?.split('.').pop() || '';
      this.form.patchValue(this.trainingReport);
    }
  }

  /**
   * Inicializar formulario
   */
  public formInit() {
    this.form = this.fb.group({
      training_report_id: [this.trainingReport.id],
      distance: ['', Validators.required],
      comments: ['', Validators.required],
    });
  }

  /**
   * Añadir imagen como evidencia
   */
  public async addImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
    });

    this.type = 'img';
    this.selectedFile = null;
    this.selectedImage = image ? image.dataUrl : undefined;
  }

  /**
   * Aádir documento como evidencia
   * @param event
   */
  public async addDocument(event) {
    this.type = 'doc';
    const file: File = event.target.files;
    this.selectedImage = undefined;
    this.selectedFile = file;
  }

  /**
   * Guardar reporte del usuario para el entrenamiento seleccionado
   */
  public saveReport() {
    this.form.markAllAsTouched();

    const formValue = this.form.value;
    const formData = new FormData();

    if (!this.selectedFile && !this.selectedImage) {
      return this.utilities.showToast(
        'Debe añadir una evidencia como imagen o documento'
      );
    }

    formData.append(
      'training_report_id',
      formValue.training_report_id.toString()
    );
    formData.append('distance', formValue.distance.toString());
    formData.append('comments', formValue.comments.toString());
    formData.append('type', this.type);
    if (this.type === 'img' && this.selectedImage) {
      formData.append('evidence', this.selectedImage);
    } else if (this.type === 'doc' && this.selectedFile) {
      formData.append('evidence', this.selectedFile[0]);
    }

    this.apiService.addEntityFormData('addUserReport', formData).subscribe({
      next: (data) => {
        if (data.status === 1) {
          this.utilities.showToast('Reporte guardado correctamente');
          this.navCtrl.navigateRoot('/home-runner');
        }
      },
      error: (err) => {
        this.utilities.showToast(
          'Ocurrió un error al guardar el reporte, inténtelo de nuevo'
        );
        console.error(err);
      },
      complete: () => {},
    });
  }

  /**
   * Abrir documento de evidencia
   */
  public openDocument() {
    Browser.open({ url: this.trainingReport.evidence || '' });
  }
}
