import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';
import { Pokemon } from './interface/pokemon';
import { PokemonInfo } from './interface/pokemonInfo';

@Injectable({
  providedIn: 'root'
})
export class PokemonBasicService {

  constructor(private http: HttpClient) { 
    this.loadTypes();
  }

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

  public getInfoDetail(id: number): Observable<PokemonInfo> {

    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .pipe(map((response: any) => {
        return { 
          name: response.name,
          id: response.id,
          image: response.sprites.other['official-artwork'].front_default,
          shiny: response.sprites.other['official-artwork'].front_shiny,
          types: response.types.map((data: any) => data.type.name),
          weigth: response.weigth,
          heigth: response.heigth,
          baseStats: response.stats.map((data: any) => data.baseStats)
        };
      }));
  }

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

  private types: any[] = [];

  private loadTypes() {
    this.http.get<any>('assets/data/types.json').subscribe(
      (typesData) => {
        this.types = typesData.results.map((type: any) => type.name);
      }
    );
  }

  getTypes(): any[] {
    return this.types;
  }

}