import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonBasicService {

  constructor(private http: HttpClient) { }

  public getInfo2() {
    console.log(this.http.get<any[]>(`https://pokeapi.co/api/v2/pokemon/`));
  }

  public getInfo(): Observable<any> {

    //Pokemon[]
    console.log(this.http.get<any[]>(`https://pokeapi.co/api/v2/pokemon/3`));

    return this.http.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=151`)
      .pipe(map((response: any) => response.results)); /*?offset=20&limit=151 */
  }
}
