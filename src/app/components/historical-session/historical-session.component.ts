import { Component, Input, OnInit } from '@angular/core';
import { RelationCards } from './../../models/relationCards.model';

@Component({
  selector: 'app-historical-session',
  templateUrl: './historical-session.component.html',
  styleUrls: ['./historical-session.component.css']
})
export class HistoricalSessionComponent implements OnInit {

  @Input()
  active: RelationCards;

  @Input()
  disabledCards: boolean;

  @Input()
  showTitleType: boolean;

  constructor() { }

  ngOnInit(): void {

  }
}
