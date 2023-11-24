import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.page.html',
  styleUrls: ['./busqueda.page.scss'],
})
export class BusquedaPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  buscar(event: any) {
    const textoBusqueda = event.target.value;
    console.log('Texto de búsqueda:', textoBusqueda);

    // Aquí podrías realizar acciones adicionales, como enviar el texto de búsqueda a algún servicio
    // o manejar la lógica de búsqueda
    // Por ejemplo, podrías actualizar los resultados en el div map_canvas
  }
}
