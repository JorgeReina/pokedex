import { Component, Inject, OnInit } from '@angular/core';
import { PokemonBasicService } from './pokemonBasic.service';


@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})

export class PokemonListComponent {
  

  nombre='';
  constructor(private pokemonBasic: PokemonBasicService) {}
  
  cargaNombre() {
    this.nombre = 'Cargando nombre...';
    this.pokemonBasic.getNombre()
    .subscribe((nuevoNombre) => (this.nombre = nuevoNombre));
    }
    
}
