import { Component, OnInit} from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  Marker,
  Environment
} from '@ionic-native/google-maps';
@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  map: GoogleMap | undefined;
  constructor() { }

  ionViewDidLoad() {
    this.loadMap();
  }
  loadMap() {
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyDNtHCMNzjHWu5WxJ3i4iNQ2weKzmQk5Ow`)',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyDNtHCMNzjHWu5WxJ3i4iNQ2weKzmQk5Ow`)'
    });

    let mapOptions: GoogleMapOptions = {
      camera: {
         target: {
           lat: 43.0741904,
           lng: -89.3809802
         },
         zoom: 18,
         tilt: 30
       }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);

    let marker: Marker = this.map.addMarkerSync({
      title: 'Ionic',
      icon: 'blue',
      animation: 'DROP',
      position: {
        lat: 43.0741904,
        lng: -89.3809802
      }
    });
    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      alert('clicked');
    });
  }
  async obtenerMiUbicacion() {
    let ubicacion = await Geolocation.getCurrentPosition();
    console.log(ubicacion.coords.longitude, ubicacion.coords.latitude)
    console.log(ubicacion)
  };
  ngOnInit() {
  }
}
