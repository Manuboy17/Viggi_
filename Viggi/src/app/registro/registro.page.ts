import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular'; 
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  form: FormGroup;

  constructor(
    private afAuth: Auth,
    private alertController: AlertController, 
    private router: Router 
  ) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      password2: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  async onSubmit() {
    if (!this.form.valid) {
      console.log("Fallo el registro");
    } else {
      const emailControl = this.form.get('email');
      const passwordControl = this.form.get('password');

      if (emailControl && passwordControl) {
        const email = emailControl.value;
        const password = passwordControl.value;
        try {
          // Crea el usuario en Firebase Authentication
          const userCredential = await createUserWithEmailAndPassword(this.afAuth, email, password);
          this.form.reset();

          // Muestra una alerta indicando que el usuario se ha creado con éxito
          this.presentAlert('Usuario Creado', 'La cuenta se ha creado con éxito.');

          // Redirige al usuario a la página de inicio de sesión
          this.router.navigate(['/login']);
        } catch (error) {
          this.presentAlert('No se ha podido registrar', 'Revise si sus credenciales son validas');
        }
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

  ngOnInit() {}
}
