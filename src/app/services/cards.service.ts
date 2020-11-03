import { Card } from './../models/card.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor( private http: HttpClient ) { }

  getAllCards(): Observable<Card[]> {
    return this.http.get<Card[]>('assets/cards/data.json');
  }
}
