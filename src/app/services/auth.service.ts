import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
import { Storage } from '@ionic/storage-angular';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public authenticationState = new BehaviorSubject('');

  constructor(private storage: Storage, private apiService: ApiService) {
    this.storage.create();
    this.checkToken();
  }

  /**
   * Verificar si existe token de sesión
   */
  public checkToken() {
    this.storage.get(TOKEN_KEY).then((res) => {
      if (res) {
        this.authenticationState.next(res);
      }
    });
  }

  /**
   * Asignar token de sesión al almacenamiento local
   * @param token
   * @returns
   */
  public login(token: any) {
    return this.storage.set(TOKEN_KEY, token).then(() => {
      this.authenticationState.next(token);
    });
  }

  /**
   * Cerrar sesión y eliminar token almacenado
   * @returns
   */
  public logout() {
    this.storage.remove('user');
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next('logout');
    });
  }

  /**
   * Devolver valor actual del token de sesión
   * @returns
   */
  public isAuthenticated() {
    return this.authenticationState.value;
  }
}
