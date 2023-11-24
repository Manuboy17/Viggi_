import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {

  constructor(
    private auth: Auth,
    private alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
  }
  async eliminarCuenta(){
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar tu cuenta?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: async () => {
            try {
              const user = await this.auth.currentUser;
              if (user) {
                await user.delete();
                this.router.navigate(['/home']);
              }
            } catch (error) {
              console.error('Error al eliminar la cuenta:', error);
              this.presentAlert('Error', 'Ocurrió un error al eliminar la cuenta.');
            }
          }
        }
      ]
    });

    await alert.present();
  }
  async presentAlert(title: string, message: string) {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
