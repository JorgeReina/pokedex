import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';
import { Pokemon } from './interface/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonBasicService {

  constructor(private http: HttpClient) { }

  public getInfo(): Observable<Pokemon[]> {

    let pokemons: Observable<Pokemon>[] = [];

    for (let i = 1; i < 152; i++) {
      pokemons.push(this.http.get(`https://pokeapi.co/api/v2/pokemon/${i}/`)
      .pipe(map((response: any) => {
        return { 
          id: response.id,
          image: response.sprites.other['official-artwork'].front_default,
          name: response.name,
          types: response.types.map((data: any) => data.type.name)
        };
      })));
    }

    return forkJoin(pokemons);

  }

}
