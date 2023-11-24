import { Component, OnInit} from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { ApiKey } from '../services/API';
import { Auth } from '@angular/fire/auth';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  Marker,
  Environment
} from '@ionic-native/google-maps';
import { Router } from '@angular/router';
@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  latitud: number | undefined;
  longitud: number | undefined;
  map: GoogleMap | undefined;
  constructor(private router: Router, private afAuth: Auth) { }

  ngOnInit() {
    this.loadMap();
  }
  async cerrarSesion() {
    try {
      await this.afAuth.signOut();
      this.router.navigate(['/home']);
    } catch (error) {
      // Manejar errores aquí
    }
  }
  async loadMap() {
    const location = await Geolocation.getCurrentPosition();
    const mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: location.coords.latitude,
          lng: location.coords.longitude
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);

    const marker: Marker = this.map.addMarkerSync({
      title: 'Ionic',
      icon: 'blue',
      animation: 'DROP',
      position: {
        lat: location.coords.latitude,
        lng: location.coords.longitude
      }
    });

    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      alert('Marker clicked!');
    });
  }
}
