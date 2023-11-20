import { Component, OnInit, Output } from '@angular/core';
import { PokemonBasicService } from '../pokemonBasic.service';
import { PokemonInfo } from '../interface/pokemonInfo';
import { ActivatedRoute } from "@angular/router";
import { Description } from '../interface/description';
import { Damages } from '../interface/damages';
import { Observable, forkJoin, tap } from 'rxjs';

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

        console.log(this.getIdTypes(this.infoPokemon.types[0]));

        console.log(this.type1, this.type2, this.infoPokemon.types);
        this.showTableDamage(this.type1, this.type2);
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

  //  METODO QUE DEVUELVE CORRECTAMENTE LA DESCRIPCION DEL POKEMON CON LOS SALTOS DE LINEA
  formatDescription(description: string): string {
    const formattedText = description.replace(/\n/g, '<br>');
    return formattedText;
  }

  //  METODO QUE DEVULEVE LA TABLA DE DAÑOS POR TIPOS
  setTableDamage(types: number) {
    return this.pokemonBasicService.getTableDamage(types)
    .pipe(tap(tableDamages => {
      this.tableDamages = tableDamages as Damages;
      console.log(this.tableDamages);
    }));

    /*
    this.pokemonBasicService.getTableDamage(types).subscribe((tableDamages) => {
      this.tableDamages = tableDamages as Damages;
      console.log(this.tableDamages)
    });
    */
  }

  showTableDamage(type1: number, type2: number) {
    if (type2 == undefined) {
      this.setTableDamage(type1).subscribe();
    } else {
      this.setTableDamage(type1).subscribe();
      this.setTableDamage(type2).subscribe();
    }
    
  }

  public getIdTypes(type: string) {
    this.pokemonBasicService.getIdTypes(type).subscribe((idTypes: number[]) => {
      this.idTypes = idTypes as number[]
    })
  }

}
