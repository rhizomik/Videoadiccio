import { RelationCards } from './../models/relationCards.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  relationsHistory: RelationCards[] = [];

  constructor() { }

  getRelationsHistory() {
    this.relationsHistory = JSON.parse(localStorage.getItem('historyRelations'));
    return this.relationsHistory;
  }

  saveRelation( relation: RelationCards ) {
    this.relationsHistory.push(relation);
    localStorage.setItem('historyRelations', JSON.stringify(this.relationsHistory));
  }
  
  resetRelationsHistory() {
    this.relationsHistory = [];
    localStorage.setItem('historyRelations', JSON.stringify(this.relationsHistory));
  }
}
