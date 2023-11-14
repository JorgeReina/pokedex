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
  types: any;

  getData(): Pokemon[]{
    return this.data;
  }
    getDataFiltered(): Pokemon[]{
    return this.getData().filter((pokemons)=>pokemons.name.includes(this.filter) || pokemons.id.toString().includes(this.filter));
  }

  getTypeFiltered(types: any): Pokemon[]{
    this.types = types
    return this.getData().filter((pokemons) => pokemons.types.includes(this.types));
  }
}
