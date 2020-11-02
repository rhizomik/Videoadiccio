import { RelationCards } from './../models/relationCards.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  relationsHistory: RelationCards[] = [];

  constructor() { }

  getRelationsHistory() {
    return this.relationsHistory;
  }

  saveRelation( relation: RelationCards ) {
    this.relationsHistory.push(relation);
  }

  resetRelationsHistory() {
    this.relationsHistory = [];
  }
}
