import { Injectable } from '@angular/core';
import { SessionInfo } from './../models/sessionInfo.model';
import { RelationCards } from './../models/relationCards.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private sessionInfo: SessionInfo = new SessionInfo();

  constructor() { }

  createSession(): string {
    //For ignore multiples spaces and lower o upeer letters
    const user2 = this.sessionInfo.user.replace(/\s/g, '');
    const game2 = this.sessionInfo.game.replace(/\s/g, '');
    const user3 = user2.toLowerCase();
    const game3 = game2.toLowerCase();

    const key = `${user3}-${game3}`;
    const item = localStorage.getItem(key);

    if (item) {
      const session = JSON.parse(item);
      if (session.finish) {
        return 'Finish';
      } else {
        return 'Pending';
      }
    } else {
      this.sessionInfo.key = key;
      localStorage.setItem(this.sessionInfo.key, JSON.stringify(this.sessionInfo));
      return 'OK';
    }
  }

  updateSession(): void {
    localStorage.setItem(this.sessionInfo.key, JSON.stringify(this.sessionInfo));
  }

  getAllSessions(): SessionInfo[] {
    const keys = Object.keys(localStorage);
    const sessions: Array<SessionInfo> = [];

    keys.forEach(key => {
      const session = JSON.parse(localStorage.getItem(key));
      sessions.push(session);
    });

    return sessions;
  }

  getPendingSessions(): SessionInfo[] {
    const keys = Object.keys(localStorage);
    const sessions: Array<SessionInfo> = [];

    keys.forEach(key => {
      const session = JSON.parse(localStorage.getItem(key));
      if (!session.finish) {
        sessions.push(session);
      }
    });

    return sessions;
  }

  getFinishSessions(): SessionInfo[] {
    const keys = Object.keys(localStorage);
    const sessions: Array<SessionInfo> = [];

    keys.forEach(key => {
      const session = JSON.parse(localStorage.getItem(key));
      if (session.finish) {
        sessions.push(session);
      }
    });

    return sessions;
  }

  getSessionByUserGame(user: string, game: string): SessionInfo {
    // For ignore multiples spaces and lower o upeer letters
    const user2 = this.sessionInfo.user.replace(/\s/g, '');
    const game2 = this.sessionInfo.game.replace(/\s/g, '');
    const user3 = user2.toLowerCase();
    const game3 = game2.toLowerCase();


    const key = `${user3}-${game3}`;
    return JSON.parse(localStorage.getItem(key));
  }

  deleteSession(key: string): void {
    this.sessionInfo = new SessionInfo();
    localStorage.removeItem(key);
  }

  getUser(): string {
    return this.sessionInfo.user;
  }

  setUser(user: string): void {
    this.sessionInfo.user = user;
  }

  getGame(): string {
    return this.sessionInfo.game;
  }

  setGame(game: string): void {
    this.sessionInfo.game = game;
  }

  getRelationsHistory(): RelationCards[] {
    return this.sessionInfo.historyRelations;
  }

  saveRelation(relation: RelationCards): void {
    this.sessionInfo.historyRelations.push(relation);
  }

  getFinish(): boolean {
    return this.sessionInfo.finish;
  }

  setFinish(finish: boolean): void {
    this.sessionInfo.finish = finish;
  }

  getSessionInfo(): SessionInfo {
    return this.sessionInfo;
  }

  setSessionInfo(value: SessionInfo) {
    this.sessionInfo = value;
  }

}
