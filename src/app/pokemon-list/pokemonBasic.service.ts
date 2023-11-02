import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonBasicService {

  constructor(private http: HttpClient) { }

  getNombre(): Observable<string> {
    return this.http.get('https://pokeapi.co/api/v2/pokemon/1/')
    .pipe(map((respuesta: any) => respuesta.name));
  }
}
