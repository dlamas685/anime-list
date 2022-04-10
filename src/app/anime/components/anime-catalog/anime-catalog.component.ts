import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Media } from '../../interfaces/anime';
import { AnimeService } from '../../service/anime.service';
import { LocalStorageService } from '../../service/local-storage.service';

@Component({
  selector: 'app-anime-catalog',
  templateUrl: './anime-catalog.component.html',
  styleUrls: ['./anime-catalog.component.css']
})
export class AnimeCatalogComponent implements OnInit {

  private pageNum = 1;

  get animes$():Observable<Media[]>{
      return this.animeSvc.animes$;
  }

  constructor(private animeSvc: AnimeService, private localStorageSvc: LocalStorageService){}

  ngOnInit() {    
    this.animeSvc.getAnimes();
  }

  onScrollDown():void {
    this.pageNum++;
    this.animeSvc.getAnimePerPage(this.pageNum);
  }

  addToVisited(anime:Media){
    this.localStorageSvc.addToVisited(anime);
  }
}
