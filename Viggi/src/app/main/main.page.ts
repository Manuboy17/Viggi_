import { Component, OnInit} from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  constructor() { }

  async obtenerMiUbicacion() {
    let ubicacion = await Geolocation.getCurrentPosition();
    console.log(ubicacion.coords.longitude, ubicacion.coords.latitude)
    console.log(ubicacion)
  };



  ngOnInit() {
  }
}
