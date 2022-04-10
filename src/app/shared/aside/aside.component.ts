import { Component, OnInit } from '@angular/core';
import { AnimeService } from '../../anime/service/anime.service';
import { Filter, Media } from '../../anime/interfaces/anime';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'src/app/anime/service/local-storage.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {

  constructor(private animeSvc: AnimeService, 
    private activatedRoute: ActivatedRoute,
    private localStorageSvc: LocalStorageService){}
  
  ngOnInit() {
      this.animeSvc.getTopAnimes();
  }
  
  get populares$(): Observable<Media[]> {
      return this.animeSvc.populares$;
  }

  get visited$(): Observable<Media[]> {
    return this.localStorageSvc.visited$;
  }

}
