import { Component, OnInit, NgZone, ElementRef, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';

declare var google: any;

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.page.html',
  styleUrls: ['./busqueda.page.scss'],
  template: `
    <capacitor-google-map #map></capacitor-google-map>
    <button (click)="createMap()">Create Map</button>
  `,
  styles: [
    `
      capacitor-google-map {
        display: inline-block;
        width: 275px;
        height: 400px;
      }
    `,
  ],
})
export class BusquedaPage implements OnInit {
  autocompleteInput: string = '';
  autocompleteService: any;
  predictions: any[] = [];

  constructor(private zone: NgZone) {
    // Verifica si la librería de Google Maps está disponible
    if (typeof google !== 'undefined' && google.maps && google.maps.places) {
      this.autocompleteService = new google.maps.places.AutocompleteService();
    
    }
  }
  @ViewChild('map', { static: false }) mapRef: ElementRef<HTMLElement> | undefined;
  newMap: GoogleMap | undefined;

  async createMap() {
    this.newMap = await GoogleMap.create({
      id: 'my-cool-map',
      element: this.mapRef!.nativeElement,
      apiKey: 'AIzaSyBEgBbRIC3M4SBnTTaf4d1xiDfbDwbxT3k',
      config: {
        center: {
          lat: 33.6,
          lng: -117.9,
        },
        zoom: 8,
      },
    });
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
    this.autocompleteInput = prediction.description;
    // Aquí puedes manejar la selección del resultado de la búsqueda
    console.log(prediction);
    this.predictions = [];
  }

  ngOnInit() {
  }
  
}
