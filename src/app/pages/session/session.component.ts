import { RelationCards } from './../../models/relationCards.model';
import { Component, OnInit } from '@angular/core';
import { Card } from './../../models/card.model';
import { CardsService } from './../../services/cards.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {

  cards: Card[] = [];

  relationCards: RelationCards = new RelationCards();

  constructor(private cardsService: CardsService) {

    this.cardsService.getAllCards().subscribe(data => {
      this.cards = data;
    });
  }

  ngOnInit(): void {

  }

  getCardSelected(event): void {
    switch (event.card.type) {
      case 'Hook':
        this.relationCards.hook = event.card;
        break;
      case 'Catalyst':
        this.relationCards.catalyst = event.card;
        break;
      case 'Risc':
        this.relationCards.risc = event.card;
    }
  }
}
