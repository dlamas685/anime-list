import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Filter } from '../../interfaces/anime';
import { AnimeService } from '../../service/anime.service';
import { LocalStorageService } from '../../service/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

 

  public genders:string[] = ['','Action', 'Adventure', 'Comedy', 'Drama', 
  'Ecchi', 'Fantasy', 'Horror', 'Mahou Shoujo', 'Mecha', 'Music', 'Mystery',
  'Psychological','Romance','Sci-Fi', 'Slice of Life','Sports','Supernatural','Thriller'];

  public years:string[] = [];

  public formats:string[] = ['TV', 'Movie', 'TV_Short', 'Special', 'OVA', 'ONA', 'Music'];

  public arrayFilter:string[] = [];

  constructor() { 
      this.loadYears();
    }

  ngOnInit(): void {

  }

  private loadYears(): void {
    this.years.push('');
    for(let i:number=2022;i>=1990;i--){
      this.years.push(i.toString());
    }
  }

}
