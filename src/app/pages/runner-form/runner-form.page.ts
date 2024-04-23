import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Camera, CameraResultType } from '@capacitor/camera';
import { NavController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { confirmPassword } from 'src/utils/utils';

@Component({
  selector: 'app-runner-form',
  templateUrl: './runner-form.page.html',
  styleUrls: ['./runner-form.page.scss'],
})
export class RunnerFormPage implements OnInit {
  public title: string = 'Corredor';
  public avatar: any;
  public loading: boolean = false;
  public passwordVisible: boolean = false;
  public mode: string;
  public user: User;
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private utilities: UtilitiesService,
    private apiService: ApiService,
    private navCtrl: NavController
  ) {
    this.mode = history.state.mode;
    if (this.mode === 'edit') {
      this.user = history.state.user;
    }
  }

  ngOnInit() {
    this.formInit();
    if (this.mode === 'edit') {
      this.form.patchValue(this.user);
      this.avatar = this.form.get('avatar')?.value;
    }
  }

  /**
   * Inicialización del formulario
   */
  public formInit() {
    this.form = this.fb.group({
      avatar: ['', Validators.required],
      full_name: ['', Validators.required],
      email: ['', [Validators.required, this.emailValidator]],
      password: ['', this.mode === 'register' ? Validators.required : null],
      password_confirmation: [
        '',
        this.mode === 'register'
          ? [Validators.required, confirmPassword]
          : null,
      ],
      role_id: [2],
    });
  }

  /**
   * Manejador de imágenes
   */
  public async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      promptLabelHeader: 'Seleccione una opción',
      promptLabelPicture: 'Cámara',
      promptLabelPhoto: 'Galería',
      presentationStyle: 'fullscreen',
    });
    this.avatar = image.dataUrl;
    this.form.patchValue({ avatar: this.avatar });
  }

  /**
   * Manejador de visibilidad de contraseña
   */
  public togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  /**
   * Enviar formulario de creación/edición de usuario corredor
   * @returns
   */
  public saveRunner() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return this.utilities.showToast('Revise el formulario');
    }

    this.loading = true;

    if (this.mode === 'edit' && this.user && this.user.id !== undefined) {
      this.apiService
        .updateEntity('updateUser', this.user.id, { form: this.form.value })
        .subscribe({
          next: (data) => {
            if (data.status === 1) {
              this.utilities.showToast('Usuario actualizado correctamente');
              this.navCtrl.navigateRoot('/home-trainer');
              this.mode = '';
            }
            this.mode = '';
          },
          error: () => {},
          complete: () => {},
        });
    } else if (this.mode === 'register') {
      this.apiService
        .addEntity('addUser', { form: this.form.value })
        .subscribe({
          next: (data) => {
            if (data.status === 1) {
              this.utilities.showToast('Usuario registrado correctamente');
              this.navCtrl.navigateRoot('/home-trainer');
              this.mode = '';
            }
          },
          error: (err) => {
            console.error(err);
          },
          complete: () => {},
        });
    }
  }

  /**
   * Validador para email
   * @param control
   * @returns
   */
  emailValidator(control: AbstractControl) {
    const value = control.value;
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

    if (emailPattern.test(value)) {
      return null;
    } else {
      return { emailInvalid: true };
    }
  }
}
