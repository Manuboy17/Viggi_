import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Auth, sendPasswordResetEmail } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-missed-pass',
  templateUrl: './missed-pass.page.html',
  styleUrls: ['./missed-pass.page.scss'],
})
export class MissedPassPage implements OnInit {
  form: FormGroup;
  constructor(private afAuth: Auth, private alertController: AlertController, private router: Router) { 
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
        this.form.reset();
        // Muestra una alerta indicando que se ha enviado un correo electrónico de restablecimiento
        this.presentAlert('Correo Electrónico Enviado', 'Se ha enviado un correo electrónico de restablecimiento de contraseña a tu dirección de correo.');
        this.router.navigate(['/login'])
      } catch (error) {
        this.presentAlert('No se ha encontrado el correo', 'Revise si su correo es valido');
        this.form.reset();
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
