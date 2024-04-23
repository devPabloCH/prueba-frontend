import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UtilitiesService {
  constructor(
    private toastController: ToastController,
    private storage: Storage
  ) {}

  public async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 5000,
      mode: 'md',
      buttons: ['OK'],
    });
    toast.present();
  }
}
