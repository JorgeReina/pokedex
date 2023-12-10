import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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

  @Input()
  urlEvolution = "";

  @Input()
  name: string = "";
  name2: string[] = [];
  name3: string[] = [];
  
  evolutionChain: EvolutionChain = {
    name1: "",
    chainEvolution: [],
  }

  constructor(
    private pokemonBasicService: PokemonBasicService,
    private router: Router
    ) { }

  ngOnChanges(changes: SimpleChanges) {
    if ( changes['urlEvolution']) {
      this.setChainEvolution()
    }
  }

  //  RELLENAR CADENA EVOLUTIVA
  setChainEvolution() {
    this.pokemonBasicService.getChainEvolution(this.urlEvolution).subscribe(
      data => this.evolutionChain = data
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