import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { EvolutionChain } from '../interface/evolutionChain';
import { PokemonBasicService } from '../pokemonBasic.service';
import { Router } from '@angular/router';
import { EvolutionDetails } from '../interface/evolutionDetails';
import { Img } from '../interface/img';

@Component({
  selector: 'app-evolution-chain',
  templateUrl: './evolution-chain.component.html',
  styleUrls: ['./evolution-chain.component.css']
})
export class EvolutionChainComponent implements OnChanges{

  numberList: number = 1;

  @Input()
  urlEvolution = "";

  
  evolutionChain: EvolutionChain = {
    name1: "",
    chainEvolution: [],
  }

  imgEvo1: Img = {
    img: "",
  }


  constructor(
    private pokemonBasicService: PokemonBasicService,
    private router: Router
    ) { }

  ngOnChanges(changes: SimpleChanges) {
    if ( changes['urlEvolution'] && !changes['urlEvolution'].previousValue) {
      this.setChainEvolution()
    }
    if (changes['evolutionChain.name1'] && !changes['evolutionChain.name1'].previousValue) {
      console.log(this.setImg(this.evolutionChain.name1));
      
    }
  }

  //  RELLENAR CADENA EVOLUTIVA
  setChainEvolution() {
    this.pokemonBasicService.getChainEvolution(this.urlEvolution).subscribe(
      data => this.evolutionChain = data
    );
  }

  setImg(name: string) {
    this.pokemonBasicService.getImg(name).subscribe(
      data => this.imgEvo1 = data,
    );
  }

  //  METODO QUE FUERZA LA ACTUALIZACIÓN DE LA PAGINA
  navigateToPokemon(name: string) {
    // Navegar a la misma ruta para forzar la actualización de la página
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/pokemon', name]);
    });
  }

}
