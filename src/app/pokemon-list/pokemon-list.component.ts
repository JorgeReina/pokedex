import { Component, Input, OnInit } from '@angular/core';
import { PokemonBasicService } from '../pokemonBasic.service';
import { Pokemon } from '../interface/pokemon';



@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit{

  data: Pokemon[] = [];
  botonPulsado: string = "0";

  constructor(private pokemonBasicService: PokemonBasicService) {
    
  }
  ngOnInit(): void {
    this.setData()
  }

  @Input()
  filter: any;
  types: any[] = [];

  // Funcion para obtener los datos desde la Api y guardarlos en data
  setData() {
    this.pokemonBasicService.getInfo().subscribe((data) => {
      this.data = data as any[];
      console.log(this.data);
    })
  }

  // Mostrar data
  getData(): Pokemon[]{
    return this.data;
  }

  // Mostrar Types
  getTypes(): string[]{
    return this.pokemonBasicService.getTypes()
  }

  getTypeFiltered(type: any){
    this.types.push(type)
  }
  getDataFiltered(): Pokemon[] {

    if (this.botonPulsado.includes("0")) {
      return this.getData().filter((pokemons)=>pokemons.name.includes(this.filter) 
      || pokemons.id.toString().includes(this.filter));
    } else if (this.botonPulsado.includes("1")) {
      return (this.getDataFirstGeneration())
    } else if (this.botonPulsado.includes("2")) {
      return this.getDataSecondGeneration()
    } else if (this.botonPulsado.includes("3")) {
      return this.getDataThirdGeneration()
    } else if (this.botonPulsado.includes("4")) {
      return this.getDataFourGeneration()
    } else {
      return this.data.filter((pokemon) => {
        const nameMatch = pokemon.name.includes(this.filter) || pokemon.id.toString().includes(this.filter);
        const typeMatch = this.types && this.types.length == 0 || this.types.some((type: string) => pokemon.types.includes(type));
        return nameMatch && typeMatch;
      });
    }
    
  }

  // Filtrado por primera generacion
  getDataFirstGeneration(): Pokemon[]{
    return this.getData().filter((pokemons)=>pokemons.id <= 151 && pokemons.name.includes(this.filter));
  }

  // Filtrado por segunda generacion
  getDataSecondGeneration(): Pokemon[]{
    return this.getData().filter((pokemons)=>pokemons.id > 151 && pokemons.id <= 251 && pokemons.name.includes(this.filter));
  }

  // Filtrado por tercera generacion
  getDataThirdGeneration(): Pokemon[]{
    return this.getData().filter((pokemons)=>pokemons.id > 251 && pokemons.id <= 386 && pokemons.name.includes(this.filter));
  }

  // Filtrado por cuarta generacion
  getDataFourGeneration(): Pokemon[]{
    return this.getData().filter((pokemons)=>pokemons.id > 386 && pokemons.id <= 492 && pokemons.name.includes(this.filter));
  }

  // Reseto de filtros
  resetFilters(){
    this.filter = ""
    this.types = []
  }

  // Obtener nombre de los tipos desde types.json
  getNameType(type: string){
    this.botonPulsado = type;
  }

  // Funcion para botones Generacion
  pulsado(n: string) {
    this.botonPulsado = n;
  }

  /*
    getDataFiltered(): Pokemon[]{
    return this.getData().filter((pokemons)=>pokemons.name.includes(this.filter) || pokemons.id.toString().includes(this.filter));
  }*/

}

