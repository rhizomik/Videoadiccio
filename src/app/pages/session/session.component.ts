import { Card } from './../../models/card.model';
import { CardsService } from './../../services/cards.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {

  cards: Card[] = [];

  constructor(private cardsService: CardsService) {

    this.cardsService.getAllCards().subscribe(data => {
      this.cards = data;
      console.log(this.cards);
    });
  }

  ngOnInit(): void {

  }

}
