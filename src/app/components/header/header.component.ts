import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  @Input() hasBackBtn?: boolean = false;

  constructor(private auth: AuthService, private navCtrl: NavController) {}

  ngOnInit() {}

  /**
   * Cerrar sesión
   */
  public logout() {
    this.auth.logout();
  }

  /**
   * Volver a pantalla anterior
   */
  public goBack() {
    this.navCtrl.back();
  }
}
