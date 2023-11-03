import { Component, OnInit } from '@angular/core';
import { PokemonBasicService } from '../pokemonBasic.service';



@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit{

  data: any = "";

  constructor(private pokemonBasicService: PokemonBasicService) {

  }
  ngOnInit(): void {
    this.llenarData()
  }

  llenarData() {
    this.pokemonBasicService.getInfo().subscribe( data => {
      this.data = data;
      console.log(this.data)
    })
  }

}
