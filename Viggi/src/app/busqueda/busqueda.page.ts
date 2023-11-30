import { Component, OnInit, NgZone, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { GeolocationPosition, Geolocation } from '@capacitor/geolocation';
import { AlertController } from '@ionic/angular';
declare var google: any;

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.page.html',
  styleUrls: ['./busqueda.page.scss'],
})
export class BusquedaPage implements OnInit {
  latitud: number | undefined;
  longitud: number | undefined;
  autocompleteInput: string = '';
  autocompleteService: any;
  predictions: any[] = [];
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;

  map: any;
  geocoder: any;

  constructor(private zone: NgZone, private alertController: AlertController) {
    if (typeof google !== 'undefined' && google.maps && google.maps.places) {
      this.autocompleteService = new google.maps.places.AutocompleteService();
    }
  }
  
  updateSearchResults() {
    if (!this.autocompleteService) {
      console.error('La librería de Google Maps no se ha cargado correctamente.');
      return;
    }

    if (this.autocompleteInput === '') {
      this.predictions = [];
      return;
    }

    this.autocompleteService.getPlacePredictions({ input: this.autocompleteInput }, (predictions: any[]) => {
      this.zone.run(() => {
        this.predictions = predictions;
      });
    });
  }

  selectSearchResult(prediction: any) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'placeId': prediction.place_id }, (results: any, status: any) => {
      if (status === 'OK') {
        if (results[0]) {
          const selectedLocation = results[0].geometry.location;
  
          // Código para generar la ruta desde la posición actual hasta la ubicación seleccionada
          const directionsService = new google.maps.DirectionsService();
          const directionsRenderer = new google.maps.DirectionsRenderer();
  
          directionsRenderer.setMap(this.map);
  
          const start = new google.maps.LatLng(this.latitud, this.longitud);
          const end = selectedLocation;
  
          const request = {
            origin: start,
            destination: end,
            travelMode: google.maps.TravelMode.DRIVING
          };
  
          directionsService.route(request, (response: any, status: any) => {
            if (status === 'OK') {
              directionsRenderer.setDirections(response);
            } else {
              this.presentAlert('Demasiado lejos', 'La direccion seleccionada se encuentra fuera de alcanze');
            }
          });
        } else {
          console.error('No se encontraron resultados para esta predicción.');
        }
      } else {
        console.error('La geocodificación falló debido a: ' + status);
      }
    });
  
    this.predictions = [];
  }
  
  
  ngAfterViewInit() {
    Geolocation.getCurrentPosition().then((position: GeolocationPosition) => {
      this.latitud = position.coords.latitude;
      this.longitud = position.coords.longitude;

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
