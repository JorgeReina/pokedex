import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonBasicService {

  constructor(private http: HttpClient) { }

  getNombre(): Observable<string> {
    return this.http.get('https://api.chucknorris.io/jokes/random')
    .pipe(map((respuesta: any) => respuesta.value));
  }
}
