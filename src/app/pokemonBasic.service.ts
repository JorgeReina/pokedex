import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonBasicService {

  constructor(private http: HttpClient) { }

  public getInfo(): Observable<any[]> {

    let pokemons: Observable<any>[] = [];

    for (let i = 1; i < 151; i++) {
      pokemons.push(this.http.get(`https://pokeapi.co/api/v2/pokemon/${i}/`)
      .pipe(map((response: any) => response)));
    }

    return forkJoin(pokemons);

  }

}
