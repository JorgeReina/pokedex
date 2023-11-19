import { Component, OnInit, Output } from '@angular/core';
import { PokemonBasicService } from '../pokemonBasic.service';
import { PokemonInfo } from '../interface/pokemonInfo';
import { ActivatedRoute } from "@angular/router";
import { Description } from '../interface/description';
import { Damages } from '../interface/damages';

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
    idTypes: [],
    types: [],
    weight: 0,
    height: 0,
    nameStats: [],
    baseStats: []
  };

  descriptionPokemon: Description = {
    description: ""
  };

  tableDamages: Damages = {
    doubleDamageFrom: [],
    doubleDamageTo: [],
    halfDamageFrom: [],
    halfDamageTo: [],
    noDamageFrom: [],
    noDamageTo: [],
  }

  constructor(private pokemonBasicService: PokemonBasicService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.numberList = params['id'];
      this.setData();
      this.setDescription();

      /*
      let type1: number = 0;
      let type2: number = 0;

      if (this.infoPokemon.idTypes) {
        type1 = this.infoPokemon.idTypes[0];
        type2 = this.infoPokemon.idTypes[1];
      }

      this.setTableDamage(type1);
      */
    });
  }
      
  //  FUNCION PARA OBTENER LOS DATOS DESDE LA API Y GUARDARLOS EN DATA
  setData() {
    this.pokemonBasicService.getInfoDetail(this.numberList).subscribe((infoPokemon) => {
      this.infoPokemon = infoPokemon as PokemonInfo;
      console.log(this.infoPokemon)
    });
  }

  //  FUNCION PARA OBTENER LA DESCRIPCION DEL POKEMON
  setDescription() {
    this.pokemonBasicService.getDescription(this.numberList).subscribe((descriptionPokemon) => {
      this.descriptionPokemon = descriptionPokemon as Description;
    });
  }

  //  METODO QUE DEVUELVE CORRECTAMENTE LA DESCRIPCION DEL POKEMON CON LOS SALTOS DE LINEA
  formatDescription(description: string): string {
    const formattedText = description.replace(/\n/g, '<br>');
    return formattedText;
  }

  setTableDamage(types: number) {
    this.pokemonBasicService.getTableDamage(types).subscribe((tableDamages) => {
      this.tableDamages = tableDamages as Damages;
      console.log(this.tableDamages)
    });
  }

  /*
  // Mostrar data
  getData(): PokemonInfo{
    return this.infoPokemon;
  }*/

}
