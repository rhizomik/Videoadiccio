import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { RelationCards } from './../../models/relationCards.model';
import { StorageService } from './../../services/storage.service';

@Component({
  selector: 'app-history-relations',
  templateUrl: './history-relations.component.html',
  styleUrls: ['./history-relations.component.css']
})
export class HistoryRelationsComponent implements OnInit {

  user: string;
  game: string;

  history: RelationCards[];

  constructor(private storageService: StorageService,
              private router: Router) { }

  ngOnInit(): void {
    this.user = this.storageService.getUser();
    this.game = this.storageService.getGame();

    if (!this.user || !this.game) {
      this.router.navigate(['home']);
    }

    this.history = this.storageService.getRelationsHistory();
  }

  deleteRelation(relation: RelationCards): void {
    const index = this.history.indexOf(relation);
    this.history.splice(index, 1);

    this.storageService.setRelationHistory(this.history);
    this.storageService.updateSession();
  }

  goBack() {
    if (this.storageService.getFinish()) {
      this.router.navigate(['history-sessions']);
    } else {
      this.router.navigate(['session']);
    }
  }
}
