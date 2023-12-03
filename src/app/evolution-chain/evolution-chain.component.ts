import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { EvolutionChain } from '../interface/evolutionChain';
import { PokemonBasicService } from '../pokemonBasic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, forkJoin, tap } from 'rxjs';
import { EvolutionDetails } from '../interface/evolutionDetails';

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

  evolutionDetail: EvolutionDetails = {
    gender:                  0,
    held_item:               "",
    item:                    "",
    known_move:              "",
    known_move_type:         "",
    location:                "",
    min_affection:           0,
    min_beauty:              0,
    min_happiness:           0,
    min_level:               0,
    needs_overworld_rain:    false,
    party_species:           "",
    party_type:              "",
    relative_physical_stats: 0,
    time_of_day:             "",
    trade_species:           "",
    turn_upside_down:        false,
    trigger:                 "",
  }

  evolutionDetail2: EvolutionDetails = {
    gender:                  0,
    held_item:               "",
    item:                    "",
    known_move:              "",
    known_move_type:         "",
    location:                "",
    min_affection:           0,
    min_beauty:              0,
    min_happiness:           0,
    min_level:               0,
    needs_overworld_rain:    false,
    party_species:           "",
    party_type:              "",
    relative_physical_stats: 0,
    time_of_day:             "",
    trade_species:           "",
    turn_upside_down:        false,
    trigger:                 "",
  }

  constructor(
    private pokemonBasicService: PokemonBasicService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnChanges(changes: SimpleChanges) {
    if ( changes['urlEvolution'] && !changes['urlEvolution'].previousValue) {
      this.setChainEvolution()
      
    }

    this.setEvolutionDetails()
    this.setEvolutionDetails2()

  }

  //  RELLENAR EL NOMBRE DE LAS EVOLUCIONES
  setChainEvolution() {
    this.pokemonBasicService.getChainEvolution(this.urlEvolution).subscribe(
      data => this.evolutionChain = data
    );
  }

  //  RELLENAR LOS DETALLES DE EVOLUCION
  setEvolutionDetails() {
    this.pokemonBasicService.getEvolutionDetail(this.urlEvolution).subscribe(
      data => this.evolutionDetail = data
    );
  }

  //  RELLENAR LOS DETALLES DE EVOLUCION 2
  setEvolutionDetails2() {
    this.pokemonBasicService.getEvolutionDetail2(this.urlEvolution).subscribe(
      data => this.evolutionDetail2 = data
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
