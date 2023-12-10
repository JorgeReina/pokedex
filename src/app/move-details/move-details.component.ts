import { Component, Input, OnInit } from '@angular/core';
import { MovesDetails } from '../interface/moveDetails';
import { PokemonBasicService } from '../pokemonBasic.service';

@Component({
  selector: 'app-move-details',
  templateUrl: './move-details.component.html',
  styleUrls: ['./move-details.component.css']
})
export class MoveDetailsComponent implements OnInit {

  @Input()
  url:string = ""

  moveDetail: MovesDetails = {
    category: [],
    power: [],
    accuracy: [],
    type: [],
  }

  constructor(private pokemonBasicService: PokemonBasicService) {}

  ngOnInit(): void {
    this.setMoveDetail(this.url)
  }

  setMoveDetail(url: string) {
    this.pokemonBasicService.getMovesDetails(url).subscribe(
      data => this.moveDetail = data
    )
  }

}
