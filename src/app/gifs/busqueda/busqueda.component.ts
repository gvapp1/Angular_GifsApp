import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html'  
})
export class BusquedaComponent {

  constructor(private gifsService: GifsService){}

  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>; //!no null section operation, asegura que el objeto no es nulo

  buscar(){    
    const valor = this.txtBuscar.nativeElement.value;
    this.gifsService.buscarGifs(valor);
    this.txtBuscar.nativeElement.value = '';
  }

}
