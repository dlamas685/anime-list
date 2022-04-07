import { Component, OnInit } from '@angular/core';
import { AnimeService } from '../../anime/service/anime.service';
import { Filter, Media } from '../../anime/interfaces/anime';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {


  constructor(private animeService: AnimeService){
        
  }
  
  ngOnInit() {
      this.animeService.filtrarCincoAnimes();
  }
  
  get populares$(): Observable<Media[]> {
      return this.animeService.populares$;
  }
  get historial():Filter[]{
      return this.animeService.historial;
  }

  reSearch(search:Filter):void{
      this.animeService.establecerParametros(search);
      this.animeService.filtrarAnimes();
  }

}
