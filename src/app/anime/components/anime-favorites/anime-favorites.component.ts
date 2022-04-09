import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Media } from '../../interfaces/anime';
import { AnimeService } from '../../service/anime.service';
import { LocalStorageService } from '../../service/local-storage.service';

@Component({
  selector: 'app-anime-favorites',
  templateUrl: './anime-favorites.component.html',
  styleUrls: ['./anime-favorites.component.css']
})
export class AnimeFavoritesComponent implements OnInit {

  p: number = 1;
  
  constructor(private localStorageSvc:LocalStorageService ){}

  ngOnInit() {
    
  }

  get animesFavorites$():Observable<Media[]> {
    return this.localStorageSvc.animesFavorites$;
  }

  public removeAnimeFavorite(anime:Media): void {
    this.localStorageSvc.addOrRemoveFevorite(anime);
  }

}
