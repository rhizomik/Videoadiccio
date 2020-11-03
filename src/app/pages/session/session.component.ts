import { StorageService } from './../../services/storage.service';
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

  defaultCard: Card = new Card();

  relation: RelationCards;

  constructor(private cardsService: CardsService,
              private storageService: StorageService) { }
  
  ngOnInit(): void {
    this.cardsService.getAllCards().subscribe(data => {
      this.setCardsByType(data);
    });

    this.relation = new RelationCards();

    this.defaultCard.name = 'default';
    this.defaultCard.content = '../../../assets/img/plantilla.png';
    this.defaultCard.type = 'Hook';
    this.relation.hook = this.defaultCard;
  }

  private setCardsByType(data: Card[]) {
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
        this.relation.hook = event.card;
        this.typeCard = 'Risk';
        this.activeCards = this.risks;
        break;
      case 'Risk':
        this.relation.risc = event.card;
        this.typeCard = 'Catalyst';
        this.activeCards = this.catalysts;
        break;
      case 'Catalyst':
        this.relation.catalyst = event.card;
        this.showSave = true;
    }
  }

  selectNextType() {
    this.showSave = false;
    this.continue = true;
    this.storageService.saveRelation(this.relation);
  }

  nextIterationType(type: string) {
    const prevHook = this.relation.hook;
    const prevRisk = this.relation.risc;
    this.relation = new RelationCards();

    switch (type) {
      case 'Hook':
        this.relation.hook = this.defaultCard;
        this.typeCard = 'Hook';
        this.activeCards = this.hooks;
        break;
      case 'Risk':
        this.relation.hook = prevHook;
        this.typeCard = 'Risk';
        this.activeCards = this.risks;
        break;
      case 'Catalyst':
        this.relation.hook = prevHook;
        this.relation.risc = prevRisk;
        this.typeCard = 'Catalyst';
        this.activeCards = this.catalysts;
    }
    this.continue = false;
  }

}
