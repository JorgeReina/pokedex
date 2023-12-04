import { Component, Input, SimpleChanges } from '@angular/core';
import { PokemonBasicService } from '../pokemonBasic.service';
import { Moves } from '../interface/moves';
import { MovesDetails } from '../interface/moveDetails';

@Component({
  selector: 'app-moves',
  templateUrl: './moves.component.html',
  styleUrls: ['./moves.component.css']
})
export class MovesComponent {

  @Input()
  id = 0;
  @Input()
  url = "";

  moves: Moves = {
    move: [],
    detail: [],
    
  }

  movesLevel: Moves = {
    move: [],
    detail: [],
  }

  movesMT: Moves = {
    move: [],
    detail: [],
  }

  moveDetail: MovesDetails = {
    categoria: [],
    potencia: [],
    precison: [],
  }

  constructor(private pokemonBasicService: PokemonBasicService) {}

  ngOnChanges(changes: SimpleChanges) {
    if ( changes['id'] && !changes['id'].previousValue) {
      this.setMoves()
      this.setMovesLevel()
      this.setMoveDetail(this.url)
    }
  }

  setMoves() {
    this.pokemonBasicService.getMoves(this.id).subscribe(
      data => this.movesLevel = data
    );
  }

  setMoveDetail(url: string) {
    this.pokemonBasicService.getMovesDetails(url).subscribe(
      data => this.moveDetail = data
    )
  }

  setMovesLevel() {
    
  }

}
