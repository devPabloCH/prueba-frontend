import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ApiService } from './services/api.service';
import { User } from './models/user';
import { Storage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  user: User;
  constructor(
    private auth: AuthService,
    private apiService: ApiService,
    private storage: Storage,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.auth.authenticationState.subscribe((token) => {
      if (token != 'logout' && token != '') {
        this.apiService.setToken(token);
        this.apiService.getEntity('user').subscribe({
          next: (data) => {
            this.user = data.user;
            this.storage.set('user', this.user);
            if (this.user.role_id === 1) {
              this.navCtrl.navigateRoot('/home-trainer');
            }

            if (this.user.role_id === 2) {
              this.navCtrl.navigateRoot('/home-runner');
            }
          },
          error: (err) => {
            console.error(err);
          },
          complete: () => {},
        });
      } else if (token === 'logout') {
        this.apiService.removeToken();
        this.navCtrl.navigateRoot('login');
      }
    });
  }
}
