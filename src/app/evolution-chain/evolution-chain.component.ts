import { Component, Input, OnInit } from '@angular/core';
import { EvolutionChain } from '../interface/evolutionChain';
import { PokemonBasicService } from '../pokemonBasic.service';
import { ActivatedRoute } from '@angular/router';
import { delay, forkJoin, tap } from 'rxjs';

@Component({
  selector: 'app-evolution-chain',
  templateUrl: './evolution-chain.component.html',
  styleUrls: ['./evolution-chain.component.css']
})
export class EvolutionChainComponent implements OnInit{

  numberList: number = 1;

  @Input()
  urlEvolution = "";

  evolutionChain: EvolutionChain = {
    chainEvolution: 0
  }

  constructor(private pokemonBasicService: PokemonBasicService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.numberList = params['id'];
    });

    console.log(this.urlEvolution)
    this.setChainEvolution()
    
    //this.setChainEvolution()
  }

  setChainEvolution() {
    this.pokemonBasicService.getChainEvolution(this.urlEvolution).subscribe(
      data => this.evolutionChain = data
    )
  }

}
