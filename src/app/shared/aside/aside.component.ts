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

  constructor(){}
  
  ngOnInit() {
  }
  

}
