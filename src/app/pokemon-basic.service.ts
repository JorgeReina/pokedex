import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonBasicService {

  constructor(private http: HttpClient) { }

  public getInfo(): Observable<any> {
    return this.http.get<any>('https://pokeapi.co/api/v2/pokemon/'); /*?offset=20&limit=151 */
  }
}
