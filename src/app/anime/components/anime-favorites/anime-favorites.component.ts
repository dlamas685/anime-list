import { Component, OnInit } from '@angular/core';
import { Media } from '../../interfaces/anime';
import { AnimeService } from '../../service/anime.service';

@Component({
  selector: 'app-anime-favorites',
  templateUrl: './anime-favorites.component.html',
  styleUrls: ['./anime-favorites.component.css']
})
export class AnimeFavoritesComponent implements OnInit {

  p: number = 1;
  
  constructor(private animeService: AnimeService){}

  ngOnInit() {
    
  }

  get favoritos():Media[] {
    return this.animeService.favoritos;
  }

  removerFavorito(favorito:Media):void{
    this.animeService.agregarFavorito(favorito);
  }

}
