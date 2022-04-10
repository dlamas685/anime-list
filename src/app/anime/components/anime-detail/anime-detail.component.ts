import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, AfterViewInit, OnDestroy} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, switchMap, tap } from 'rxjs';
import { Media } from '../../interfaces/anime';
import { AnimeService } from '../../service/anime.service';
import { LocalStorageService } from '../../service/local-storage.service';

@Component({
  selector: 'app-anime-detail',
  templateUrl: './anime-detail.component.html',
  styleUrls: ['./anime-detail.component.css']
})
export class AnimeDetailComponent implements OnInit {

  videoWidth: number = 560 ;
  videoHeight: number = 315;
  
  // private _anime$: Observable<Media> = new Observable<Media>();


  constructor(
    private animeSvc: AnimeService, 
    private activatedRoute: ActivatedRoute,
    private localStorageSvc: LocalStorageService,
    ) {}



  get anime$():Observable<Media> {
    return this.animeSvc.anime$;
  }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      tap(({id}) => this.animeSvc.getAnime(id))
    ).subscribe();
  }

  toggleFavorite(anime:Media):void {
    const isFavorite = anime.isFavorite;
    anime.isFavorite = !isFavorite;
    this.localStorageSvc.addOrRemoveFevorite(anime);
  }

}
