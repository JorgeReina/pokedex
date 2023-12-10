import { Component, OnInit, Output } from '@angular/core';
import { PokemonBasicService } from '../pokemonBasic.service';
import { PokemonInfo } from '../interface/pokemonInfo';
import { ActivatedRoute } from "@angular/router";
import { Description } from '../interface/description';
import { Damages } from '../interface/damages';
import { Observable, delay, forkJoin, map, of, pipe, tap } from 'rxjs';
import { TableDamages } from '../interface/tableDamages';
import { TraduccionService } from '../traduccion.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit{

  modoOscuro: boolean = false;
  cambiarModo() {
    this.modoOscuro = !this.modoOscuro;
  }

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
    description: "",
    urlEvolutionChain: []
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

  constructor(private pokemonBasicService: PokemonBasicService, private route: ActivatedRoute,private traduccionService: TraduccionService) { }

  obtenerIdiomaActual(): 'es' | 'en' {
    return this.traduccionService.obtenerIdiomaActual();
  }
  cambiarIdioma(idioma: 'es' | 'en') {
    this.traduccionService.cambiarIdioma(idioma);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.numberList = params['id'];

    });

    forkJoin([
      this.setData(),
      this.setDescription()
    ]).pipe(
      delay(500),
      tap(() => {

        if (this.infoPokemon.types.length > 1) {
          this.pokemonBasicService.getIdTypes(this.infoPokemon.types[0]).subscribe(
            (id: number) => {
              this.type1 = id;
              this.setTableDamage(this.type1, 1).subscribe(
                (tableDamages: any) => {
                  this.tableDamages = tableDamages as Damages;
                }
              );
            }
          );

          this.pokemonBasicService.getIdTypes(this.infoPokemon.types[1]).subscribe(
            (id: number) => {
              this.type2 = id;
              this.setTableDamage(this.type2, 2).subscribe(
                (tableDamages: any) => {
                  this.tableDamages2 = tableDamages as Damages;
                  this.joinTableDamage()
                }
              );
            }
          )
        } else {
          this.pokemonBasicService.getIdTypes(this.infoPokemon.types[0]).subscribe(
            (id: number) => {
              this.type1 = id;
              this.setTableDamage(this.type1, 1).subscribe(
                (tableDamages: any) => {
                  this.tableDamages = tableDamages as Damages;
                  this.joinTableDamage()
                });
            });
        }
      })
    ).subscribe(() => {
      // Otras operaciones después del retraso
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

  //  FUNCION PARA OBTENER LA TABLA DE DAÑOS
  setTableDamage(types: number, option: number): Observable<Damages> {
    switch (option) {
      case 1:
        return this.pokemonBasicService.getTableDamage(types);
      case 2:
        return this.pokemonBasicService.getTableDamage(types);
      default:
        return of(); // Puedes ajustar esto según tus necesidades
    }
  }

  //  METODO QUE DEVUELVE CORRECTAMENTE LA DESCRIPCION DEL POKEMON CON LOS SALTOS DE LINEA
  formatDescription(description: string): string {
    const formattedText = description.replace(/\n/g, '<br>');
    return formattedText;
  }

  //  METDODO QUE UNIFICA LAS TABLAS
  joinTableDamage() {

    //  RELLENAR LOS ARRAYS EN 
    this.tableDamagesFull.doubleDamageFrom = Array.from(new Set([...this.tableDamages.doubleDamageFrom,...this.tableDamages2.doubleDamageFrom]))

    this.tableDamagesFull.halfDamageFrom = Array.from(new Set([...this.tableDamages.halfDamageFrom, ...this.tableDamages2.halfDamageFrom]));

    this.tableDamagesFull.noDamageFrom = Array.from(new Set([...this.tableDamages.noDamageFrom,...this.tableDamages2.noDamageFrom]));

    // Copiar los arrays para evitar modificar el original durante el filtrado - ¡NO MOVER DE SITIO!
    const tempDoubleDamageFrom = [...this.tableDamagesFull.doubleDamageFrom];
    const tempHalfDamageFrom = [...this.tableDamagesFull.halfDamageFrom];

    // Filtrar los duplicados en doubleDamageFrom
    this.tableDamagesFull.doubleDamageFrom = this.tableDamagesFull.doubleDamageFrom.filter(
      (type) => !tempHalfDamageFrom.includes(type)
    );

    // Filtrar los duplicados en halfDamageFrom
    this.tableDamagesFull.halfDamageFrom = tempHalfDamageFrom.filter(
      (type) => !tempDoubleDamageFrom.includes(type)
    );

    // Encontrar duplicados y agregar a los arrays correspondientes en tableDamagesFull
    this.tableDamages.doubleDamageFrom.forEach((type) => {
      if (this.tableDamages2.doubleDamageFrom.includes(type)) {
        this.tableDamagesFull.x4.push(type);
      }
    });
    // Encontrar duplicados y agregar a los arrays correspondientes en tableDamagesFull
    this.tableDamages.halfDamageFrom.forEach((type) => {
      if (this.tableDamages2.halfDamageFrom.includes(type)) {
        this.tableDamagesFull.quarterDamageFrom.push(type);
      }
    });

    // Eliminar tipos en doubleDamageFrom si ya están en x4
    this.tableDamagesFull.doubleDamageFrom = this.tableDamagesFull.doubleDamageFrom.filter(
      (type) => !this.tableDamagesFull.x4.includes(type)
    );

    // Eliminar tipos en halfDamageFrom si ya están en quarterDamageFrom
    this.tableDamagesFull.halfDamageFrom = this.tableDamagesFull.halfDamageFrom.filter(
      (type) => !this.tableDamagesFull.quarterDamageFrom.includes(type)
    );

    // Eliminar tipos en doubleDamageFrom si ya están en noDamageFrom
    this.tableDamagesFull.doubleDamageFrom = this.tableDamagesFull.doubleDamageFrom.filter(
      (type) => !this.tableDamagesFull.noDamageFrom.includes(type)
    );

  }

  //Cambiar a shiny
  shinyMode = false;

  toggleShiny() {
    this.shinyMode = !this.shinyMode;
  }

  //  OBTINE LA IMAGEN DEL TIPO EN LA CARTA
  getImagePath(type: string): string {
    return `/assets/images/types/${type.toLowerCase()}.png`;
  }

}
