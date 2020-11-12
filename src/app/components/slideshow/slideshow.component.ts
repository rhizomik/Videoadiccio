import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

  @Output()
  selectedCard = new EventEmitter();

  @Input()
  showAdd: boolean;

  constructor() { }

  ngOnInit(): void {
    this.configureSwiper();
  }

  configureSwiper() {
    this.mySwiper = new Swiper('.swiper-container', {
      loop: true,
      effect: 'coverflow',
      grabCursor: true,
      slidesPerView: 1,
      spaceBetween: 300,
      breakpoints: {
        // col-md
        1200: {
          slidesPerView: 1.3
        },
        // col-lg
        1700: {
          slidesPerView: 1.6
        },
        // col-xl
        2300: {
          slidesPerView: 2,
        }
      },
      centeredSlides: true,
      observer: true,
      observeParents: true,
      parallax: true,
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 400,
        modifier: 1,
        slideShadows : true,
      },
      pagination: {
        el: '.swiper-pagination',
      }
    });
  }

  onSlideNext()
  {
    this.mySwiper.slideNext();
  }

  onSlidePrev() {
    this.mySwiper.slidePrev();
  }

  addCard() {
    const currentSlide = this.mySwiper.activeIndex;
    this.mySwiper.activeIndex = 0;
    this.selectedCard.emit({ card: this.cards[currentSlide] });

  }

}
