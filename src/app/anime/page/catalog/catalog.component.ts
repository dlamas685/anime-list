import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Media } from '../../interfaces/anime';
import { AnimeService } from '../../service/anime.service';
import { LocalStorageService } from '../../service/local-storage.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  public genders:string[] = ['','Action', 'Adventure', 'Comedy', 'Drama', 
  'Ecchi', 'Fantasy', 'Horror', 'Mahou Shoujo', 'Mecha', 'Music', 'Mystery',
  'Psychological','Romance','Sci-Fi', 'Slice of Life','Sports','Supernatural','Thriller'];

  public years:string[] = [];

  public formats:string[] = ['TV', 'Movie', 'TV_Short', 'Special', 'OVA', 'ONA', 'Music'];

  public arrayFilter:string[] = [];

  private pageNum = 1;

  get animes$():Observable<Media[]>{
      return this.animeSvc.animes$;
  }

  constructor(private animeSvc: AnimeService, private localStorageSvc: LocalStorageService) { 
      this.loadYears();
    }

  ngOnInit(): void {
    this.animeSvc.getAnimes();
  }

  private loadYears(): void {
    this.years.push('');
    for(let i:number=2022;i>=1990;i--){
      this.years.push(i.toString());
    }
  }

  onScrollDown():void {
    this.pageNum++;
    this.animeSvc.getAnimePerPage(this.pageNum);
  }
}
