import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './page/home/home.component';
import { FavoritesComponent } from './page/favorites/favorites.component';
import { DetailComponent } from './page/detail/detail.component';
import { AnimeDetailComponent } from './components/anime-detail/anime-detail.component';
import { AnimeFiltersComponent } from './components/anime-filters/anime-filters.component';
import { AnimeCatalogComponent } from './components/anime-catalog/anime-catalog.component';
import { AnimeFavoritesComponent } from './components/anime-favorites/anime-favorites.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination'



@NgModule({
  declarations: [
    HomeComponent,
    FavoritesComponent,
    DetailComponent,
    AnimeDetailComponent,
    AnimeFiltersComponent,
    AnimeCatalogComponent,
    AnimeFavoritesComponent
  ],
  exports: [
    HomeComponent,
    FavoritesComponent,
    DetailComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class AnimeModule { }
