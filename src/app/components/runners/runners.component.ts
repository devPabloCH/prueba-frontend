import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-runners',
  templateUrl: './runners.component.html',
  styleUrls: ['./runners.component.scss'],
})
export class RunnersComponent implements OnInit {
  @Input() runners: User[] = [];
  @Output() userDeleted: EventEmitter<void> = new EventEmitter<void>();

  public loading: boolean = false;
  public show: boolean = false;

  constructor(
    private alertCtrl: AlertController,
    private apiService: ApiService,
    private utilities: UtilitiesService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {}

  async presentAlert(user: User) {
    const alert = await this.alertCtrl.create({
      header: '¡Aviso!',
      message: '¿Está seguro que desea eliminar este usuario?',
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
            this.deleteUser(user);
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
  deleteUser(user: User) {
    this.apiService.deleteEntity('deleteUser', user.id).subscribe({
      next: (data) => {
        if (data.status === 1) {
          this.utilities.showToast('Usuario eliminado correctamente');
          this.userDeleted.emit();
        }
      },
      error: (err) => {
        console.error(err);
        this.utilities.showToast(
          'Ocurrió un error al eliminar al usuario, inténtelo de nuevo'
        );
      },
      complete: () => {},
    });
  }

  /**
   * Editar datos de usuario seleccionado
   * @param user
   */
  public editUser(user) {
    this.navCtrl.navigateForward('/runner-form', {
      state: {
        user: user,
        mode: 'edit',
      },
    });
  }
}
