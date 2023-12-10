import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PokemonBasicService } from '../pokemonBasic.service';
import { Moves } from '../interface/moves';
import { MovesDetails } from '../interface/moveDetails';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-moves',
  templateUrl: './moves.component.html',
  styleUrls: ['./moves.component.css']
})
export class MovesComponent implements OnChanges, OnInit {

  @Input()
  id: number = 1;
  @Input()
  url = "";

  numberList: number = 1;

  moves: Moves = {
    move: [],
    url: [],
    detail: [],
    
  }

  movesLevel: Moves = {
    move: [],
    url: [],
    detail: [],
  }

  movesMT: Moves = {
    move: [],
    url: [],
    detail: [],
  }

  constructor(private pokemonBasicService: PokemonBasicService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.numberList = params['id'];
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if ( changes['id'] && !changes['id'].previousValue) {
      this.setMoves(this.numberList)
    }
  }

  setMoves(n: number) {
    this.pokemonBasicService.getMoves(n).subscribe(
      data => this.moves = data
    );
  }

}