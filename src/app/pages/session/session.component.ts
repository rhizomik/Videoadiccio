import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
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

  category1: Card[] = [];
  category2: Card[] = [];
  category3: Card[] = [];

  constructor(private cardsService: CardsService) {

    this.cardsService.getAllCards().subscribe(data => {
      this.cards = data;
    });
  }

  ngOnInit(): void {

  }

  onDrop(event: CdkDragDrop<Card[]>) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

}
