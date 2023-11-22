import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonListComponent } from "./pokemon-list/pokemon-list.component";
import { PokemonComponent } from "./pokemon/pokemon.component";
import { Pagina404Component } from './pagina404/pagina404.component';

const routes: Routes = [
  { path: 'pokemon-list', component: PokemonListComponent },
  { path: 'pokemon/:id', component: PokemonComponent},
  { path: '', redirectTo: 'pokemon-list', pathMatch: 'full'},
  { path: '**', component:Pagina404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
