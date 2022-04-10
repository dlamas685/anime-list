import { Component, Input, OnInit } from '@angular/core';
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



  constructor(
    ) { }

  ngOnInit(): void {

  }

}
