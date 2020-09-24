import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor( private http: HttpClient ) { }

  getAllCards() {
    return this.http.get('assets/cards/data.json');
  }




}
