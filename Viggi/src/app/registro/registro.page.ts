import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  form: FormGroup;
  constructor(
    private afAuth: AngularFireAuth
  ) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      password2: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }
  login() {
    this.afAuth.signInWithEmailAndPassword('correo@example.com', 'contraseña')
      .then((userCredential: auth.UserCredential) => {
        // Usuario ha iniciado sesión correctamente
        const user = userCredential.user;
        console.log('Usuario autenticado:', user);
      })
      .catch((error: any) => {
        // Error al iniciar sesión
        console.error('Error al iniciar sesión:', error);
      });
  }

  
  
  onSubmit() {
  }
  ngOnInit() {
  }
}
