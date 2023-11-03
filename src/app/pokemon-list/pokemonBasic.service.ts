import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonBasicService {

  constructor(private http: HttpClient) { }

  /*getInfo(): Observable<String> {
    return this.getInfo('https://pokeapi.co/api/v2/pokemon/')
    .pipe(map((respuesta: any) => respuesta.name));
  }*/
}
