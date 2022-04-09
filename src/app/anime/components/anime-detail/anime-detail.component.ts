import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, AfterViewInit, OnDestroy} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
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
  
  constructor(
    private animeSvc: AnimeService, 
    private activatedRoute: ActivatedRoute,
    private localStorageSvc: LocalStorageService,
    ) {}

  get anime$():Observable<Media> {
    return this.animeSvc.anime$;
  }

  ngOnInit(): void {
    const {id} =  this.activatedRoute.snapshot.params;
    this.animeSvc.getAnime(id);
  }

  toggleFavorite(anime:Media):void {
    const isFavorite = anime.isFavorite;
    anime.isFavorite = !isFavorite;
    this.localStorageSvc.addOrRemoveFevorite(anime);
  }

}
