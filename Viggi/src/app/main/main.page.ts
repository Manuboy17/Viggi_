import { Component, OnInit, NgZone, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { GeolocationPosition, Geolocation } from '@capacitor/geolocation';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
declare var google: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit, AfterViewInit {
  latitud: number | undefined;
  longitud: number | undefined;
  autocompleteInput: string = '';
  autocompleteService: any;
  predictions: any[] = [];
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;

  map: any;
  geocoder: any;

  constructor(private zone: NgZone, private router: Router, private afAuth: Auth) {
    // Verifica si la librería de Google Maps está disponible
    if (typeof google !== 'undefined' && google.maps && google.maps.places) {
      this.autocompleteService = new google.maps.places.AutocompleteService();
      this.geocoder = new google.maps.Geocoder();
    }
  }

  ngOnInit() {}

  ngAfterViewInit() {
    Geolocation.getCurrentPosition().then((position: GeolocationPosition) => {
      this.latitud = position.coords.latitude;
      this.longitud = position.coords.longitude;

      // Inicializar el mapa con la posición actual
      const mapOptions = {
        center: new google.maps.LatLng(this.latitud, this.longitud), 
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      };
      this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);

      const marker = new google.maps.Marker({
        map: this.map,
        position: new google.maps.LatLng(this.latitud, this.longitud),
        title: 'Tú'
      });
    });
  }

  async cerrarSesion() {
    try {
      await this.afAuth.signOut();
      this.router.navigate(['/home']);
    } catch (error) {
      // Manejar errores aquí
    }
  }
}
