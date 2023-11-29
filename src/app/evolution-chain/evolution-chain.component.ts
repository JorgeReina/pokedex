import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { EvolutionChain } from '../interface/evolutionChain';
import { PokemonBasicService } from '../pokemonBasic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, forkJoin, tap } from 'rxjs';

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
    name2: [],
    name3: [],
    chainEvolution: [],
  }

  constructor(
    private pokemonBasicService: PokemonBasicService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnChanges(changes: SimpleChanges) {
    if ( changes['urlEvolution'] && !changes['urlEvolution'].previousValue) {
      delay(500),this.setChainEvolution();
    }
  }

  setChainEvolution() {
    this.pokemonBasicService.getChainEvolution(this.urlEvolution).subscribe(
      data => this.evolutionChain = data
    )
  }

  //  METODO QUE FUERZA LA ACTUALIZACIÓN DE LA PAGINA
  navigateToPokemon(name: string) {
    // Navegar a la misma ruta para forzar la actualización de la página
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/pokemon', name]);
    });
  }

}
