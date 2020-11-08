import { DialogBoxComponent } from './../../components/dialog-box/dialog-box.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { StorageService } from './../../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'Concienciamiento de los factores implicados en la videodicción';

  form: FormGroup;

  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private storageService: StorageService,
              private dialog: MatDialog) {

    if (storageService.getRelationsHistory().length !== 0) {
      this.openDialog();
    }
    this.initForm();
   }

  ngOnInit(): void {
  }

  openDialog(): void {

    const dialogRef = this.dialog.open(DialogBoxComponent, {
      disableClose: true,
      data: {
        title: 'Sesion en progreso',
        message: 'Anteriormente dejo una sesion sin finalizar. \n¿Quiere continuar con esta sesion o prefiere eliminarla?',
        okButton: 'Continuar',
        noOkButton: 'Eliminar'
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.router.navigate(['session']);
      } else {
        this.storageService.resetRelationsHistory();
      }
    });

  }

  initForm(): void {
    this.form = this.formBuilder.group({
      usuario: ['', Validators.required],
      juego: ['', Validators.required]
    });
  }

  get fields() {
    return this.form.controls;
  }

  newSession(): void {
    this.submitted = true;

    if (this.form.valid) {
      this.storageService.setUser(this.fields.usuario.value);
      this.storageService.setGame(this.fields.juego.value);

      this.router.navigate(['session']);
    }
  }
}
