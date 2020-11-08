import { Router } from '@angular/router';
import { StorageService } from './../../services/storage.service';
import { RelationCards } from './../../models/relationCards.model';
import { Component, OnInit } from '@angular/core';
import { Card } from './../../models/card.model';
import { CardsService } from './../../services/cards.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from 'src/app/components/dialog-box/dialog-box.component';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {

  user: string;
  game: string;

  hooks: Card[] = [];
  risks: Card[] = [];
  catalysts: Card[] = [];

  typeCard = 'Hook';
  activeCards: Card[] = this.hooks;
  showSave = false;
  continue = false;

  defaultCard: Card = new Card();

  relation: RelationCards;

  constructor(private cardsService: CardsService,
              private storageService: StorageService,
              private dialog: MatDialog,
              private router: Router) { }

  ngOnInit(): void {
    this.user = this.storageService.getUser();
    this.game = this.storageService.getGame();

    this.cardsService.getAllCards().subscribe(data => {
      this.setCardsByType(data);
    });

    this.relation = new RelationCards();

    this.defaultCard.name = 'default';
    this.defaultCard.content = 'assets/img/plantilla.png';
    this.defaultCard.type = 'Hook';
    this.relation.hook = this.defaultCard;
  }

  private setCardsByType(data: Card[]) {
    data.forEach(card => {
      switch (card.type) {
        case 'Hook':
          this.hooks.push(card);
          break;
        case 'Risk':
          this.risks.push(card);
          break;
        case 'Catalyst':
          this.catalysts.push(card);
      }
    });
  }

  getCardSelected(event): void {
    switch (event.card.type) {
      case 'Hook':
        this.relation.hook = event.card;
        this.typeCard = 'Risk';
        this.activeCards = this.risks;
        break;
      case 'Risk':
        this.relation.risc = event.card;
        this.typeCard = 'Catalyst';
        this.activeCards = this.catalysts;
        break;
      case 'Catalyst':
        this.relation.catalyst = event.card;
        this.showSave = true;
    }
  }

  selectNextType() {
    this.showSave = false;
    this.continue = true;
    this.storageService.saveRelation(this.relation);
  }

  nextIterationType(type: string) {
    const prevHook = this.relation.hook;
    const prevRisk = this.relation.risc;
    this.relation = new RelationCards();

    switch (type) {
      case 'Hook':
        this.relation.hook = this.defaultCard;
        this.typeCard = 'Hook';
        this.activeCards = this.hooks;
        break;
      case 'Risk':
        this.relation.hook = prevHook;
        this.typeCard = 'Risk';
        this.activeCards = this.risks;
        break;
      case 'Catalyst':
        this.relation.hook = prevHook;
        this.relation.risc = prevRisk;
        this.typeCard = 'Catalyst';
        this.activeCards = this.catalysts;
    }
    this.continue = false;
  }

  finishDialog() {
      const dialogRef = this.dialog.open(DialogBoxComponent, {
      disableClose: true,
      data: {
        title: 'Finalizar sesion',
        message: '¿Esta seguro que quiere finalizar la sesión?',
        okButton: 'Finalizar',
        noOkButton: 'Cancelar'
      }
      });

      dialogRef.afterClosed().subscribe(res => {
        if (res) {
          this.storageService.resetRelationsHistory();
          this.router.navigate(['home']);
        }
      });
  }

}
