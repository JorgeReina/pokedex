import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, filter, forkJoin, map } from 'rxjs';
import { Pokemon } from './interface/pokemon';
import { PokemonInfo } from './interface/pokemonInfo';
import { Description } from './interface/description';
import { Damages } from './interface/damages';
import { EvolutionChain } from './interface/evolutionChain';
import { Img } from './interface/img';
import { Moves } from './interface/moves';
import { MovesDetails } from './interface/moveDetails';

@Injectable({
  providedIn: 'root'
})
export class PokemonBasicService {

  constructor(private http: HttpClient) { 
    this.loadTypes();
  }

  //  METODO QUE DEVUELVE LA INFORMACION NECESARIA PARA LA LISTA POKEMON
  public getInfo(): Observable<Pokemon[]> {

    let pokemons: Observable<Pokemon>[] = [];

    for (let i = 1; i < 493; i++) {
      pokemons.push(this.http.get(`https://pokeapi.co/api/v2/pokemon/${i}/`)
      .pipe(map((response: any) => {
        return { 
          id: response.id,
          image: response.sprites.other['official-artwork'].front_default,
          name: response.name,
          types: response.types.map((data: any) => data.type.name),
          generation: this.assignGeneration(i)
        };
      })));
    }

    return forkJoin(pokemons);

  }

  //  METODO QUE DEVUELVE INFORMACION DETALLADA DE CADA POKEMON
  public getInfoDetail(id: number): Observable<PokemonInfo> {

    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .pipe(map((response: any) => {
        return { 
          name: response.name,
          id: response.id,
          image: response.sprites.other['official-artwork'].front_default,
          shiny: response.sprites.other['official-artwork'].front_shiny,
          idTypes: response.types.map((data: any) => data.slot),
          urlTypes: response.types.map((data: any) => data.url),
          types: response.types.map((data: any) => data.type.name),
          weight: response.weight,
          height: response.height,
          nameStats: response.stats.map((data: any) => data.stat.name),
          baseStats: response.stats.map((data: any) => data.base_stat),
        };
      }));
  }

  //  METODO QUE DEVUELVE LA DESCRIPICION DEL POKEMON
  public getDescription(id: number): Observable<Description> {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)
    .pipe(map((response: any) => {
      const filteredEntries = response.flavor_text_entries
        .filter((data: any) => data.version.name === "black" && data.language.name === "en")
        .map((filteredData: any) => filteredData.flavor_text);
      const url = response.evolution_chain.url

      return {
        description: filteredEntries,
        urlEvolutionChain: url,
      };
    }));
  }

  //  DEVUELVE EL ID DEL TIPO ASIGNADO
  public getIdTypes(type: string): Observable<number> {
    return this.http.get('assets/data/types.json')
    .pipe(map((response: any) => {
      return (response.filter((idType: any) => type == idType.name))[0].id;
    }));
  }

  //  METODO QUE DUVUELVE LA TABLA DE TIPOS POR DAÑO
  public getTableDamage(idTypes: number): Observable<Damages> {
    return this.http.get(`https://pokeapi.co/api/v2/type/${idTypes}/`)
    .pipe(map((response: any) => {
      return {
        doubleDamageFrom: response.damage_relations.double_damage_from.map((type: any) => type.name),
        halfDamageFrom: response.damage_relations.half_damage_from.map((type: any) => type.name),
        noDamageFrom: response.damage_relations.no_damage_from.map((type: any) => type.name),
      };
    }));
  }

  //  METODO QUE DEVUELVE LA CADENA EVOLUTIVA
  public getChainEvolution(url: string): Observable<EvolutionChain> {
    return this.http.get(url)
    .pipe(map((response: any) => {
      return {
        name1: response.chain.species.name,
        chainEvolution: response.chain.evolves_to,
      };
    }));
  }

  //  METODO QUE DEVUELVE LOS MOVIMIENTOS
  public getMoves(id: number): Observable<Moves> {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .pipe(map((response: any) => {
        return {
          move: response.moves,
          url: response.moves.map((item: any) => item.move.url),
          detail: response.moves.map((item: any) => item.version_group_details)
        }
      }))
  }

  //  METODO QUE DEVUELVE LOS DETALLES DE LOS MOVIMIENTOS
  public getMovesDetails(url: string): Observable<MovesDetails> {
    return this.http.get(`${url}`)
      .pipe(map((response: any) => {
        return {
          category: response.damage_class.map((item: any) => item.name),
          power: response.power,
          accuracy: response.accuracy,
        }
      }))
  }

  //  ASIGNACION DE GENERACION (NO MUY UTIL)
  public assignGeneration(generation: any): any {
    if (generation <= 151) {
      generation = "First Generation";
    } else if (generation > 151 && generation <= 250) {
      generation = "Second Generation";
    } else if (generation > 250 && generation <= 385) {
      generation = "Third Generation"
    } else if (generation > 385 && generation <= 492) {
      generation = "Four Generation"
    }
    return generation;
  }

  //  ESTOY PROBANDOLO (NO FUNCIONA)
  public getImg(name: string): Observable<Img>{
    return this.http.get(`http://pokeapi.co/api/v2/pokemon/${name}/`)
      .pipe(map((response: any) => {
        return {
          img: response.sprites.other['official-artwork'].front_default,
        };
      }));
  }

  // LA SENTENCIA DE ABAJO SE ENCARGA DE MOSTRAR LOS TIPOS EN EL BUSCADOR
  private types: any[] = [];

  private loadTypes() {
    this.http.get<any>('assets/data/types.json').subscribe(
      (typesData) => {
        this.types = typesData.map((type: any) => type.name);
        //this.types = typesData.results.map((type: any) => type.id);
      }
    );
  }

  getTypes(): any[] {
    return this.types;
  }

}