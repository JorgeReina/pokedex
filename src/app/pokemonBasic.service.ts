import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, filter, forkJoin, map } from 'rxjs';
import { Pokemon } from './interface/pokemon';
import { PokemonInfo } from './interface/pokemonInfo';
import { Description } from './interface/description';
import { Damages } from './interface/damages';
import { EvolutionChain } from './interface/evolutionChain';
import { Chain } from '@angular/compiler';
import { EvolutionDetails } from './interface/evolutionDetails';

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
        //doubleDamageTo: response.damage_relations.double_damage_to.map((type: any) => type.name),
        halfDamageFrom: response.damage_relations.half_damage_from.map((type: any) => type.name),
        //halfDamageTo: response.damage_relations.half_damage_to.map((type: any) => type.name),
        noDamageFrom: response.damage_relations.no_damage_from.map((type: any) => type.name),
        //noDamageTo: response.damage_relations.no_damage_to.map((type: any) => type.name),
      };
    }));
  }

  //  METODO QUE DEVUELVE LA CADENA EVOLUTIVA
  public getChainEvolution(url: string): Observable<EvolutionChain> {
    return this.http.get(url)
    .pipe(map((response: any) => {
      return {
        name1: response.chain.species.name,
        name2: response.chain.evolves_to.map((data: any) => data.species.name),
        name3: response.chain.evolves_to.map((data: any) => data.evolves_to.map((name: any) => name.species.name)),
        chainEvolution: response.chain,
      };
    }));
  }

  //  METODO QUE DEVUELVE LOS DETALLES PARA EVULUCIONAR
  public getEvolutionDetail(url: string): Observable<EvolutionDetails> {
    return this.http.get(url)
    .pipe(map((response: any) => {
      return {
        gender: response.chain.evolves_to.map((data: any) => data.evolution_details.map((data2: any) => data2.gender)), 
        held_item: response.chain.evolves_to.map((data: any) => data.evolution_details.map((data2: any) => data2.held_item)), 
        item: response.chain.evolves_to.map((data: any) => data.evolution_details.map((date2: any) => date2.item)), 
        known_move: response.chain.evolves_to.map((data: any) => data.evolution_details.map((data2: any) => data2.known_move)), 
        known_move_type: response.chain.evolves_to.map((data: any) => data.evolution_details.map((data2: any) => data2.known_move_type)), 
        location: response.chain.evolves_to.map((data: any) => data.evolution_details.map((data2: any) => data2.location)), 
        min_affection: response.chain.evolves_to.map((data: any) => data.evolution_details.map((data2: any) => data2.min_affection)), 
        min_beauty: response.chain.evolves_to.map((data: any) => data.evolution_details.map((data2: any) => data2.min_beauty)), 
        min_happiness: response.chain.evolves_to.map((data: any) => data.evolution_details.map((data2: any) => data2.min_happiness)), 
        min_level: response.chain.evolves_to.map((data: any) => data.evolution_details.map((data2: any) => data2.min_level)), 
        needs_overworld_rain: response.chain.evolves_to.map((data: any) => data.evolution_details.map((data2: any) => data2.needs_overworld_rain)), 
        party_species: response.chain.evolves_to.map((data: any) => data.evolution_details.map((data2: any) => data2.party_species)), 
        party_type: response.chain.evolves_to.map((data: any) => data.evolution_details.map((data2: any) => data2.party_type)), 
        relative_physical_stats: response.chain.evolves_to.map((data: any) => data.evolution_details.map((data2: any) => data2.relative_physical_stats)), 
        time_of_day: response.chain.evolves_to.map((data: any) => data.evolution_details.map((data2: any) => data2.time_of_day)), 
        trade_species: response.chain.evolves_to.map((data: any) => data.evolution_details.map((data2: any) => data2.trade_species)), 
        turn_upside_down: response.chain.evolves_to.map((data: any) => data.evolution_details.map((data2: any) => data2.turn_upside_down)),
        trigger: response.chain.evolves_to.map((data: any) => data.evolution_details.map((data2: any) => data2.trigger.name)),
      };
    }));
  }

  //  METODO QUE DEVUELVE LOS DETALLES PARA EVULUCIONAR A 3º EVO
  public getEvolutionDetail2(url: string): Observable<EvolutionDetails> {
    return this.http.get(url)
    .pipe(map((response: any) => {
      return {
        gender: response.chain.evolves_to.map((data: any) => data.evolution_details.map((data2: any) => data2.gender)), 
        held_item: response.chain.evolves_to.map((data: any) => data.evolution_details.map((data2: any) => data2.held_item)), 
        item: response.chain.evolves_to.map((data: any) => data.evolution_details.map((name:any) => name.item)), 
        known_move: response.chain.evolves_to.map((data: any) => data.evolution_details.map((data2: any) => data2.known_move)), 
        known_move_type: response.chain.evolves_to.map((data: any) => data.evolution_details.map((data2: any) => data2.known_move_type)), 
        location: response.chain.evolves_to.map((data: any) => data.evolution_details.map((data2: any) => data2.location)), 
        min_affection: response.chain.evolves_to.map((data: any) => data.evolution_details.map((data2: any) => data2.min_affection)), 
        min_beauty: response.chain.evolves_to.map((data: any) => data.evolution_details.map((data2: any) => data2.min_beauty)), 
        min_happiness: response.chain.evolves_to.map((data: any) => data.evolution_details.map((data2: any) => data2.min_happiness)), 
        min_level: response.chain.evolves_to.map((data: any) => data.evolves_to.map((data2: any) => data2.evolution_details.map((level: any) => level.min_level))), 
        needs_overworld_rain: response.chain.evolves_to.map((data: any) => data.evolution_details.map((data2: any) => data2.needs_overworld_rain)), 
        party_species: response.chain.evolves_to.map((data: any) => data.evolution_details.map((data2: any) => data2.party_species)), 
        party_type: response.chain.evolves_to.map((data: any) => data.evolution_details.map((data2: any) => data2.party_type)), 
        relative_physical_stats: response.chain.evolves_to.map((data: any) => data.evolution_details.map((data2: any) => data2.relative_physical_stats)), 
        time_of_day: response.chain.evolves_to.map((data: any) => data.evolution_details.map((data2: any) => data2.time_of_day)), 
        trade_species: response.chain.evolves_to.map((data: any) => data.evolution_details.map((data2: any) => data2.trade_species)), 
        turn_upside_down: response.chain.evolves_to.map((data: any) => data.evolution_details.map((data2: any) => data2.turn_upside_down)),
        trigger: response.chain.evolves_to.map((data: any) => data.evolves_to.map((data2: any) => data2.evolution_details.map((trigger: any) => trigger.trigger.name))),
      };
    }));
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