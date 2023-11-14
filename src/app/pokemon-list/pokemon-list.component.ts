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

  constructor(private pokemonBasicService: PokemonBasicService) {
    
  }
  ngOnInit(): void {
    this.llenarData()
  }

  llenarData() {
    this.pokemonBasicService.getInfo().subscribe((data) => {
      this.data = data as any[];
      console.log(this.data);
    })
  }
  @Input()
  filter: any;
  types: any[] = [];

  getData(): Pokemon[]{
    return this.data;
  }
  getTypeFiltered(type: any){
    this.types.push(type)
  }
  getDataFiltered(): Pokemon[] {
    return this.data.filter((pokemon) => {
      const nameMatch = pokemon.name.includes(this.filter) || pokemon.id.toString().includes(this.filter);
      const typeMatch = this.types && this.types.length == 0 || this.types.some((type: string) => pokemon.types.includes(type));
      return nameMatch && typeMatch;
    });
  }
  resetFilters(){
    this.filter = ""
    this.types = []
  }
  /*
    getDataFiltered(): Pokemon[]{
    return this.getData().filter((pokemons)=>pokemons.name.includes(this.filter) || pokemons.id.toString().includes(this.filter));
  }*/



}

