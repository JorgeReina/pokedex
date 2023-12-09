import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TraduccionService {
  private idiomaActual: 'es' | 'en' = 'en';

  obtenerIdiomaActual(): 'es' | 'en' {
    return this.idiomaActual;
  }

  cambiarIdioma(idioma: 'es' | 'en') {
    this.idiomaActual = idioma;
  }
}
