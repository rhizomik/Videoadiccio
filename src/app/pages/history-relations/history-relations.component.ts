import { Component, OnInit } from '@angular/core';

import { RelationCards } from './../../models/relationCards.model';
import { StorageService } from './../../services/storage.service';

@Component({
  selector: 'app-history-relations',
  templateUrl: './history-relations.component.html',
  styleUrls: ['./history-relations.component.css']
})
export class HistoryRelationsComponent implements OnInit {

  history: RelationCards[];

  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    this.history = this.storageService.getRelationsHistory();
  }

}
