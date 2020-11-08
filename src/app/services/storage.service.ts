import { RelationCards } from './../models/relationCards.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  user: string;
  game: string;

  relationsHistory: RelationCards[] = [];

  constructor() { }

  getUser() {
    this.user = localStorage.getItem('user');
    return this.user;
  }

  setUser(user: string) {
    this.user = user;
    localStorage.setItem('user', this.user);
  }

  getGame() {
    this.game = localStorage.getItem('game');
    return this.game;
  }

  setGame(game: string) {
    this.game = game;
    localStorage.setItem('game', this.game);
  }

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
