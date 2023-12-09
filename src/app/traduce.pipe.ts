import { Pipe, PipeTransform } from '@angular/core';

const TRADUCCIONES = [
  {
    en: 'Very weak against: ',
    es: 'Muy débil contra: '
  },
  {
    en: 'Weak against: ',
    es: 'Débil contra:'
  },
  {
    en: 'Very strong against: ',
    es: 'Muy fuerte contra: '
  },
  {
    en: 'Strong against: ',
    es: 'Fuerte contra: '
  },
  {
    en: 'Immune a: ',
    es: 'Inmune a: '
  },
  {
    en: 'TABLE TYPES: ',
    es: 'TABLA DE TIPOS: '
  },
  {
    en: 'HABILITIES: ',
    es: 'HABILIDADES'
  },
  {
    en: 'Evolution Chain',
    es: 'Cadena Evolutiva'
  },
  {
    en: 'Height: ',
    es: 'Altura: '
  },
  {
    en: 'Weight: ',
    es: 'Peso: '
  }
];

@Pipe({
  name: 'traduce'
})
export class TraducePipe implements PipeTransform {

  transform(texto: string, idioma: 'es' | 'en'): string {
    const traduccion = TRADUCCIONES.find(t => t['en'] === texto);

    if (traduccion) {
      return traduccion[idioma];
    } else {
      return '';
    }
  }
}
