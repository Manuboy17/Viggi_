import { Component, OnInit, NgZone } from '@angular/core';

// Agrega esta línea para definir globalmente la variable google
declare var google: any;

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.page.html',
  styleUrls: ['./busqueda.page.scss'],
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

  ngOnInit() {
    // Aquí podrías inicializar algunas configuraciones adicionales si las necesitas
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

  
}
