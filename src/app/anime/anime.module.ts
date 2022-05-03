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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination'
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { BadgeGenresDirective } from './directive/badge-genres.directive';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { CatalogComponent } from './page/catalog/catalog.component';
import { AnimeRoutingModule } from './anime-routing.module';
import { ScrollButtonComponent } from './components/scroll-button/scroll-button.component';
import { FilterSelectComponent } from './components/filter-select/filter-select.component';
import { SearchInputComponent } from './components/search-input/search-input.component';



@NgModule({
  declarations: [
    //PAGINAS DEL MODULO
    HomeComponent,
    FavoritesComponent,
    DetailComponent,
    CatalogComponent,

    
    //DIRECTIVAS DEL MODULO
    BadgeGenresDirective,

    //COMPONENTES DEL MODULO
    AnimeDetailComponent,
    AnimeFiltersComponent,
    AnimeCatalogComponent,
    AnimeFavoritesComponent,
    ScrollButtonComponent,
    FilterSelectComponent,
    SearchInputComponent,
  ],
  imports: [
    CommonModule,
    AnimeRoutingModule,
    SharedModule,
    FormsModule,
    InfiniteScrollModule,
    NgxPaginationModule
  ]
})
export class AnimeModule { }
