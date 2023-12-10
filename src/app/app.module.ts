import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { FormsModule } from '@angular/forms';
import { EvolutionChainComponent } from './evolution-chain/evolution-chain.component';
import { TraducePipe } from './traduce.pipe';
import { PaginaErrorComponent } from './pagina-error/pagina-error.component';
import { MovesComponent } from './moves/moves.component';
import { MoveDetailsComponent } from './move-details/move-details.component';
import { ImgEvoChainComponent } from './img-evo-chain/img-evo-chain.component';
import { ServiceWorkerModule } from '@angular/service-worker';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    PokemonListComponent,
    PokemonComponent,
    EvolutionChainComponent,
    TraducePipe,
    PaginaErrorComponent,
    MovesComponent,
    MoveDetailsComponent,
    ImgEvoChainComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
