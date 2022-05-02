import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { DetailComponent } from './page/detail/detail.component';
import { FavoritesComponent } from './page/favorites/favorites.component';
import { CatalogComponent } from './page/catalog/catalog.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {path:'catalog', component:CatalogComponent},
      {path:'detail/:id', component:DetailComponent},
      {path:'favorites', component:FavoritesComponent},
      {path:'**', redirectTo:'catalog'}
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AnimeRoutingModule { }
