import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Media } from '../../interfaces/anime';
import { AnimeService } from '../../service/anime.service';

@Component({
  selector: 'app-anime-catalog',
  templateUrl: './anime-catalog.component.html',
  styleUrls: ['./anime-catalog.component.css']
})
export class AnimeCatalogComponent implements OnInit {

  private _resultado$ = new Observable<Media[]>();

  p: number = 1;

  get resultado$():Observable<Media[]>{
      return this._resultado$;
  }

  constructor(private animeService: AnimeService){
      this._resultado$ = this.animeService.animesFiltrados$;
  }

  ngOnInit() {    
      this.animeService.filtrarAnimesPupolares();
  }

}
