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
  showAdd = true;

  defaultCardHook: Card = new Card();
  defaultCardRisk: Card = new Card();
  defaultCardCatalyst: Card = new Card();

  relation: RelationCards;

  constructor(private cardsService: CardsService,
              private storageService: StorageService,
              private dialog: MatDialog,
              private router: Router) { }

  ngOnInit(): void {
    this.user = this.storageService.getUser();
    this.game = this.storageService.getGame();

    if (!this.user || !this.game) {
      this.router.navigate(['home']);
    }

    this.cardsService.getAllCards().subscribe(data => {
      this.setCardsByType(data);
    });

    this.relation = new RelationCards();
    this.createDefaultCards();

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

  private createDefaultCards(): void {
    this.defaultCardHook.name = 'default';
    this.defaultCardHook.content = 'assets/img/plantilla.png';
    this.defaultCardHook.type = 'Hook';
    this.relation.hook = this.defaultCardHook;

    this.defaultCardRisk.name = 'default';
    this.defaultCardRisk.content = 'assets/img/plantilla.png';
    this.defaultCardRisk.type = 'Risk';
    this.relation.risc = this.defaultCardRisk;

    this.defaultCardCatalyst.name = 'default';
    this.defaultCardCatalyst.content = 'assets/img/plantilla.png';
    this.defaultCardCatalyst.type = 'Catalyst';
    this.relation.catalyst = this.defaultCardCatalyst;
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
        this.typeCard = 'Undefined';
        this.showAdd = false;
        this.showSave = true;
    }
  }

  selectNextType() {
    this.showSave = false;
    this.continue = true;
    this.storageService.saveRelation(this.relation);
    this.storageService.updateSession();
  }

  nextIterationType(type: string) {
    this.showAdd = true;
    this.showSave = false;

    const prevHook = this.relation.hook;
    const prevRisk = this.relation.risc;
    this.relation = new RelationCards();

    switch (type) {
      case 'Hook':
        this.relation.hook = this.defaultCardHook;
        this.relation.risc = this.defaultCardRisk;
        this.relation.catalyst = this.defaultCardCatalyst;

        this.typeCard = 'Hook';
        this.activeCards = this.hooks;
        break;
      case 'Risk':
        if (prevHook.name === 'default') {
          this.showAdd = false;
        }

        this.relation.hook = prevHook;
        this.relation.risc = this.defaultCardRisk;
        this.relation.catalyst = this.defaultCardCatalyst;

        this.typeCard = 'Risk';
        this.activeCards = this.risks;
        break;
      case 'Catalyst':
        if (prevHook.name === 'default' || prevRisk.name === 'default') {
          this.showAdd = false;
        }

        this.relation.hook = prevHook;
        this.relation.risc = prevRisk;
        this.relation.catalyst = this.defaultCardCatalyst;
        
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
          this.storageService.setFinish(true);
          this.storageService.updateSession();

          this.router.navigate(['home']);
        }
      });
  }

}
