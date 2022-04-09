import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-scroll-button',
  templateUrl: './scroll-button.component.html',
  styleUrls: ['./scroll-button.component.css']
})
export class ScrollButtonComponent implements OnInit {

  showButton = false;

  private scrollHeight = 500;

  constructor(@Inject(DOCUMENT) private document:Document) { }

  @HostListener('window:scroll')
  OnWindowScroll(): void {
    const yOffSet = window.pageYOffset;
    const scrollTop = this.document.documentElement.scrollTop;
    this.showButton = (yOffSet || scrollTop) > this.scrollHeight;
  }

  ngOnInit(): void {
  }

  onScrollTop():void {
    this.document.documentElement.scrollTop = 0;
  }

}
