import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Auth, sendPasswordResetEmail } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-missed-pass',
  templateUrl: './missed-pass.page.html',
  styleUrls: ['./missed-pass.page.scss'],
})
export class MissedPassPage implements OnInit {
  form: FormGroup;
  constructor(private afAuth: Auth, private alertController: AlertController) { 
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }
  async onSubmit() {
    if (this.form.valid) {
      const email = this.form.get('email')?.value;

      try {
        // Envía un correo electrónico de restablecimiento de contraseña
        await sendPasswordResetEmail(this.afAuth, email);

        // Muestra una alerta indicando que se ha enviado un correo electrónico de restablecimiento
        this.presentAlert('Correo Electrónico Enviado', 'Se ha enviado un correo electrónico de restablecimiento de contraseña a tu dirección de correo.');

      } catch (error) {
        console.error('Error al enviar el correo electrónico de restablecimiento:', error);
      }
    }
  }
  async presentAlert(title: string, message: string) {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }
  ngOnInit() {
  }

}
