import { Component, OnInit, Output } from '@angular/core';
import { PokemonBasicService } from '../pokemonBasic.service';
import { PokemonInfo } from '../interface/pokemonInfo';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit{

  numberList: number = 0;

  infoPokemon: PokemonInfo = {
    name: "",
    id: 0,
    image: "",
    shiny: "",
    types: [],
    weight: 0,
    height: 0,
    nameStats: [],
    baseStats: []
  };

  constructor(private pokemonBasicService: PokemonBasicService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.numberList = params['id'];
      this.setData();
    });
  }

  // Funcion para obtener los datos desde la Api y guardarlos en data
  setData() {
    this.pokemonBasicService.getInfoDetail(this.numberList).subscribe((infoPokemon) => {
      this.infoPokemon = infoPokemon as PokemonInfo;
    })
  }

  // Mostrar data
  getData(): PokemonInfo{
    return this.infoPokemon;
  }
  //Cambiar a shiny
  shinyMode = false;

  toggleShiny() {
  this.shinyMode = !this.shinyMode;
}

}
