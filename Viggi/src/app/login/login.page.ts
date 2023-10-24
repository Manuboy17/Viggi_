import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';

import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup;
  constructor(
    private afAuth: Auth, 
    private router: Router,
    private alertController: AlertController
    ) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }
  async onSubmit() {
    if (this.form.valid) {
      const email = this.form.get('email')?.value;
      const password = this.form.get('password')?.value;

      try {
        // Inicia sesión con Firebase Authentication
        await signInWithEmailAndPassword(this.afAuth, email, password);

        this.presentAlert('Inicio sesion exitoso', 'Ha iniciado sesion con exito ');
        this.router.navigate(['/main']);
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
      }
    }
  }
  async presentAlert(title: string, message: string) {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
  ngOnInit() {
  }

}
