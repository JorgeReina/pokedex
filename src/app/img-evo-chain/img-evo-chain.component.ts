import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PokemonBasicService } from '../pokemonBasic.service';
import { Img } from '../interface/img';
import { delay } from 'rxjs';

@Component({
  selector: 'app-img-evo-chain',
  templateUrl: './img-evo-chain.component.html',
  styleUrls: ['./img-evo-chain.component.css']
})
export class ImgEvoChainComponent implements OnChanges {

  @Input()
  name: string = ""

  imgEvo: Img = {
    img: "",
  }

  constructor(private pokemonBasicService: PokemonBasicService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.name) {
      this.setImg(this.name)
    }
  }

  

  //  MOSTRAR IMG
  setImg(name: string) {
    this.pokemonBasicService.getImg(name).subscribe(
      data => this.imgEvo = data,
    );
  }

}
