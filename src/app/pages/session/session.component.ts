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

  hooks: Card[] = [];
  risks: Card[] = [];
  catalysts: Card[] = [];

  typeCard = 'Hook';
  activeCards: Card[] = this.hooks;
  showSave = false;
  continue = false;

  relationCards: RelationCards = new RelationCards();

  constructor(private cardsService: CardsService) { }
  
  ngOnInit(): void {
    this.cardsService.getAllCards().subscribe(data => {
      this.setCardsByType(data);
    });
  }

  setCardsByType(data: Card[]) {
    data.forEach(card => {
      switch (card.type) {
        case 'Hook':
          this.hooks.push(card);
          break;
        case 'Risk':
          this.risks.push(card);
          break;
        case 'Catalyst':
          this.catalysts.push(card);
      }
    });
  }

  getCardSelected(event): void {
    switch (event.card.type) {
      case 'Hook':
        this.relationCards.hook = event.card;
        this.typeCard = 'Risk';
        this.activeCards = this.risks;
        break;
      case 'Risk':
        this.relationCards.risc = event.card;
        this.typeCard = 'Catalyst';
        this.activeCards = this.catalysts;
        break;
      case 'Catalyst':
        this.relationCards.catalyst = event.card;
        this.showSave = true;
    }
  }

  selectNextType() {
    this.showSave = false;
    this.continue = true;
  }

  nextIterationType(type: string) {
    switch (type) {
      case 'Hook':
        this.relationCards.hook = null;
        this.relationCards.risc = null;
        this.relationCards.catalyst = null;
        this.typeCard = 'Hook';
        this.activeCards = this.hooks;
        break;
      case 'Risk':
        this.relationCards.risc = null;
        this.relationCards.catalyst = null;
        this.typeCard = 'Risk';
        this.activeCards = this.risks;
        break;
      case 'Catalyst':
        this.relationCards.catalyst = null;
        this.typeCard = 'Catalyst';
        this.activeCards = this.catalysts;
    }
    this.continue = false;
  }

}
