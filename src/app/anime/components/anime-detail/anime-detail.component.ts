import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Media } from '../../interfaces/anime';
import { AnimeService } from '../../service/anime.service';

@Component({
  selector: 'app-anime-detail',
  templateUrl: './anime-detail.component.html',
  styleUrls: ['./anime-detail.component.css']
})
export class AnimeDetailComponent implements OnInit {

  private _anime!:Media;

  constructor(private animeService: AnimeService, private activatedRoute: ActivatedRoute) {


   }

  get anime():Media {
    return this._anime;
  }

  ngOnInit(): void {
      
    this.activatedRoute.params
    .pipe(
      switchMap(({id}) => this.animeService.obtenerAnime(id))
    )
    .subscribe(
     (resp:Media) => {
       this._anime = resp;
     }
   );
  }

  agregarFavorito(anime:Media):void {
     this.animeService.agregarFavorito(anime);
  }

}
