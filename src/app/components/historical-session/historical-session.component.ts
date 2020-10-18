import { Component, Input, OnInit } from '@angular/core';
import { RelationCards } from './../../models/relationCards.model';

@Component({
  selector: 'app-historical-session',
  templateUrl: './historical-session.component.html',
  styleUrls: ['./historical-session.component.css']
})
export class HistoricalSessionComponent implements OnInit {

  @Input()
  relationCards: RelationCards;

  @Input()
  disabledCards: boolean;

  constructor() { }

  ngOnInit(): void {
  }
}
