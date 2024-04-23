import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  passwordVisible: boolean = false;
  loading: boolean = false;
  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, this.emailValidator]],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private auth: AuthService,
    private utilities: UtilitiesService
  ) {}

  ngOnInit() {}

  /**
   * Cambiar visibilidad de la contraseña
   */
  public togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  /**
   * Enviar formulario de inicio de sesión
   */
  public login() {
    this.loading = true;
    this.apiService
      .login(this.form.get('email')?.value, this.form.get('password')?.value)
      .subscribe({
        next: (data) => {
          this.apiService.setToken(data.access_token);
          this.auth.login(data.access_token);
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
          switch (err.error.status_message) {
            case 'bad_credentials':
              this.utilities.showToast('Credenciales incorrectas');
          }
        },
        complete: () => {
          this.loading = false;
        },
      });
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
