import { Component } from '@angular/core';
import { PokemonBasicService } from '../pokemonBasic.service';
import { PokemonInfo } from '../interface/pokemonInfo';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent {

  infoPokemon: PokemonInfo = {
    name: "",
    id: 0,
    image: "",
    shiny: "",
    types: [],
    weigth: 0,
    heigth: 0,
    baseStats: []
  };

  constructor(private pokemonBasicService: PokemonBasicService) { }


  // Funcion para obtener los datos desde la Api y guardarlos en data
  setData() {
    this.pokemonBasicService.getInfoDetail(1).subscribe((infoPokemon) => {
      this.infoPokemon = infoPokemon as PokemonInfo;
      console.log(this.infoPokemon);
    })
  }

  // Mostrar data
  getData(): PokemonInfo{
    return this.infoPokemon;
  }

}
