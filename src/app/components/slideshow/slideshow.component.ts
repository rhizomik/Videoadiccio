import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { Swiper } from 'swiper/bundle';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit {

  @Input()
  cards: Card[];

  mySwiper: Swiper;

  constructor() { }

  ngOnInit(): void {
    this.configureSwiper();
  }
  
  configureSwiper() {
    this.mySwiper = new Swiper('.swiper-container', {
      loop: true,
      grabCursor: true,
      slidesPerView: 2,
      spaceBetween: 50,
      centeredSlides: true,
      effect: 'coverflow',
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 200,
        modifier: 1,
        slideShadows : true,
      },
      pagination: {
        el: '.swiper-pagination',
      },
    });
  }

  onSlideNext()
  {
    console.log(this.cards);
    this.mySwiper.slideNext();
  }

  onSlidePrev() {
    this.mySwiper.slidePrev();
  }

}
