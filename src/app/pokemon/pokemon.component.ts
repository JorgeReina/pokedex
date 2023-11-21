import { Component, OnInit, Output } from '@angular/core';
import { PokemonBasicService } from '../pokemonBasic.service';
import { PokemonInfo } from '../interface/pokemonInfo';
import { ActivatedRoute } from "@angular/router";
import { Description } from '../interface/description';
import { Damages } from '../interface/damages';
import { Observable, delay, forkJoin, map, pipe, tap } from 'rxjs';
import { TableDamages } from '../interface/tableDamages';

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
    halfDamageFrom: [],
    noDamageFrom: [],
  }

  tableDamages2: Damages = {
    doubleDamageFrom: [],
    halfDamageFrom: [],
    noDamageFrom: [],
  }

  tableDamagesFull: TableDamages = {
    x4: [],
    doubleDamageFrom: [],
    halfDamageFrom: [],
    quarterDamageFrom: [],
    noDamageFrom: [],
  }

  idTypes: number[] = []

  constructor(private pokemonBasicService: PokemonBasicService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.numberList = params['id'];

      forkJoin([
        this.setData(),
        this.setDescription()
      ]).pipe(
        // Agrega un delay de 300 milisegundos (0.3 segundo)
        delay(300),
        tap(() => {
          if (this.infoPokemon.types.length > 0) {
            this.showTableDamage(0, this.type1, 1);
            this.showTableDamage(1, this.type2, 2);
          } else {
            this.showTableDamage(0, this.type1, 1);
          }
        })
      ).subscribe(() => {
        // Otras operaciones después del retraso
      });

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

  //  METODO QUE MUESTRA LAS TABLAS RELLENAS
  showTableDamage(n: number, type:number, option: number) {
    this.pokemonBasicService.getIdTypes(this.infoPokemon.types[n]).subscribe(
      (id: number) => {
        type = id;
        //console.log(type);
        this.setTableDamage(type, option)
      });
  }

  //  METODO QUE DEVULEVE LA TABLA DE DAÑOS
  setTableDamage(types: number, option: number) {
    
    switch (option) {
      case 1:
        this.pokemonBasicService.getTableDamage(types).subscribe((tableDamages) => {
          this.tableDamages = tableDamages as Damages;
          //console.log(this.tableDamages)
        });
        break;
      case 2:
        this.pokemonBasicService.getTableDamage(types).subscribe((tableDamages) => {
          this.tableDamages2 = tableDamages as Damages;
          //console.log(this.tableDamages2)
        });
        break;
      default:
        break;
    }
    
  }

  //Cambiar a shiny
  shinyMode = false;

  toggleShiny() {
    this.shinyMode = !this.shinyMode;
  }

}
