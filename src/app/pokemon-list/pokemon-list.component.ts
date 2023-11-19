import { Component, Input, OnInit } from '@angular/core';
import { PokemonBasicService } from '../pokemonBasic.service';
import { Pokemon } from '../interface/pokemon';



@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit{

  // Array de tipo Pokemon que contiene la informacion basica para la lista pokemon
  data: Pokemon[] = [];
  botonPulsado: string = "0";
  filterTypes: string = "";
  filterNomre: string = "";

  // Array que contine hasta que número va cada generación
  numberGeneration: number[] = [151, 251, 386, 492]

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

  // Buscador por nombres, generacion y tipos COMPLETO
  getDataFiltered(): Pokemon[] {

    if (this.botonPulsado.includes("1")) {
      return this.getFunctionDataFiltered(0, this.numberGeneration[0])
    } else if (this.botonPulsado.includes("2")) {
      return this.getFunctionDataFiltered(this.numberGeneration[0], this.numberGeneration[1])
    } else if (this.botonPulsado.includes("3")) {
      return this.getFunctionDataFiltered(this.numberGeneration[1], this.numberGeneration[2])
    } else if (this.botonPulsado.includes("4")) {
      return this.getFunctionDataFiltered(this.numberGeneration[2], this.numberGeneration[3])
    } else {
      return this.getFunctionDataFiltered(0, this.numberGeneration[3])
    }
    
  }

  // Funcion getDataFiltered
  getFunctionDataFiltered (number1: number, number2: number): Pokemon[] {
    return this.data.filter((pokemon) => {
      const genMatch = pokemon.id > number1 && pokemon.id <= number2;
      const nameMatch = pokemon.name.includes(this.filterNomre.toLowerCase()) || pokemon.id.toString().includes(this.filterNomre.toLowerCase());
      const typeMatch = this.types && this.types.length == 0 || this.types.some((type: string) => pokemon.types.includes(type));
      return genMatch && nameMatch && typeMatch;
    });
  }

  // Reseto de filtros
  resetFilters(){
    this.filter = ""
    this.types = []
  }

  // Funcion para botones Generacion
  pulsado(n: string) {
    this.botonPulsado = n;
  }

}

