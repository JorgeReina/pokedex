import { Component, OnInit, Output } from '@angular/core';
import { PokemonBasicService } from '../pokemonBasic.service';
import { PokemonInfo } from '../interface/pokemonInfo';
import { ActivatedRoute } from "@angular/router";
import { Description } from '../interface/description';
import { Damages } from '../interface/damages';
import { Observable, forkJoin, map, pipe, tap } from 'rxjs';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit{

  numberList: number = 0;
  type1: number = 1;
  type2: number = 2;

  infoPokemon: PokemonInfo = {
    name: "",
    id: 0,
    image: "",
    shiny: "",
    types: [],
    urlTypes: "",
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

  tableDamages2: Damages = {
    doubleDamageFrom: [],
    doubleDamageTo: [],
    halfDamageFrom: [],
    halfDamageTo: [],
    noDamageFrom: [],
    noDamageTo: [],
  }

  idTypes: number[] = []

  constructor(private pokemonBasicService: PokemonBasicService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.numberList = params['id'];
      this.setData();
      this.setDescription();

      forkJoin([
        this.setData(),
        this.setDescription()
      ]).subscribe(() => {


        if (this.infoPokemon.types.length > 0) {
          this.pokemonBasicService.getIdTypes(this.infoPokemon.types[0]).subscribe(
            (id: number) => {
              this.type1 = id;
              console.log(this.type1);
              this.setTableDamage(this.type1)
            });
  
          this.pokemonBasicService.getIdTypes(this.infoPokemon.types[1]).subscribe(
            (id: number) => {
              this.type2 = id;
              console.log(this.type2);
              this.setTableDamage2(this.type2)

            });
        } 
        if (this.infoPokemon.types.length == 0) {
          this.pokemonBasicService.getIdTypes(this.infoPokemon.types[0]).subscribe(
            (id: number) => {
              this.type1 = id;
              console.log(this.type1);
              this.setTableDamage(this.type1)
            });
        }
        
      });

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
    return this.pokemonBasicService.getInfoDetail(this.numberList).pipe(
      tap(infoPokemon => this.infoPokemon = infoPokemon)
    );
  }

  //  FUNCION PARA OBTENER LA DESCRIPCION DEL POKEMON
  setDescription() {
    return this.pokemonBasicService.getDescription(this.numberList).pipe(
      tap(description => this.descriptionPokemon = description)
    );
  }
  //Cambiar a shiny
  shinyMode = false;

  toggleShiny() {
  this.shinyMode = !this.shinyMode;
}

  //  METODO QUE DEVUELVE CORRECTAMENTE LA DESCRIPCION DEL POKEMON CON LOS SALTOS DE LINEA
  formatDescription(description: string): string {
    const formattedText = description.replace(/\n/g, '<br>');
    return formattedText;
  }

  //  METODO QUE DEVULEVE LA TABLA DE DAÑOS DEL 1º TIPO
  setTableDamage(types: number) {
    this.pokemonBasicService.getTableDamage(types).subscribe((tableDamages) => {
      this.tableDamages = tableDamages as Damages;
    console.log(this.tableDamages)
    });
    
  }

  //  METODO QUE DEVULEVE LA TABLA DE DAÑOS DEL 2º TIPO
  setTableDamage2(types: number) {
    this.pokemonBasicService.getTableDamage(types).subscribe((tableDamages) => {
      this.tableDamages2 = tableDamages as Damages;
    console.log(this.tableDamages2)
    });
    
  }

  //Cambiar a shiny
  shinyMode = false;

  toggleShiny() {
    this.shinyMode = !this.shinyMode;
  }

  /*
  showTableDamage(type1: number, type2: number) {
    if (type2 == undefined) {
      this.setTableDamage(type1).subscribe();
    } else {
      this.setTableDamage(type1).subscribe();
      this.setTableDamage(type2).subscribe();
    }
    
  }
  */

}
