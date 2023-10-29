import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  @ViewChild('map', { static: true }) mapElement: any;
  map: google.maps.Map;

  constructor() { }

  async obtenerMiUbicacion() {
    let ubicacion = await Geolocation.getCurrentPosition();
    console.log(ubicacion.coords.longitude, ubicacion.coords.latitude)
    console.log(ubicacion)
  };



  ngOnInit() {
    this.loadMap();
  }
  ngAfterViewInit() {
    this.loadMap();
  }
  loadMap() {
    const mapOptions: google.maps.MapOptions = {
      center: { lat: 51.678418, lng: 7.809007 }, // Reemplaza con tus coordenadas reales
      zoom: 14, // Nivel de zoom
      mapTypeId: google.maps.MapTypeId.ROADMAP, // Tipo de mapa (puedes cambiarlo a SATELLITE, HYBRID, etc.)
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }
}
