import { DialogBoxComponent } from './../../components/dialog-box/dialog-box.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { StorageService } from './../../services/storage.service';
import { SessionInfo } from 'src/app/models/sessionInfo.model';

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

   }

  ngOnInit(): void {
    this.initForm();
  }

  openDialog(config: MatDialogConfig): void {

    const dialogRef = this.dialog.open(DialogBoxComponent, config);

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        const sessionInfo = this.storageService.getSessionByUserGame(
          this.fields.usuario.value, this.fields.juego.value);
        this.storageService.setSessionInfo(sessionInfo);

        this.router.navigate(['session']);
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

      this.storageService.setSessionInfo(new SessionInfo());
      this.storageService.setUser(this.fields.usuario.value);
      this.storageService.setGame(this.fields.juego.value);

      const key = this.storageService.createSession();

      let dialogConfig;

      if (key !== 'OK') {
        if (key === 'Pending') {
          dialogConfig = {
            disableClose: true,
            data: {
              title: 'Sesion duplicada',
              message: 'Ya existe una sesión sin finalizar con el usuario y el juego indicado. \n¿Quiere continuar con la sesion pendiente? ',
              okButton: 'Aceptar',
              noOkButton: 'Cancelar'
            }
          };
        } else {
          dialogConfig = {
            disableClose: true,
            data: {
              title: 'Sesion duplicada',
              message: 'Ya existe una sessión finalizada con el usuario y el juego indicado. \nPara mas información, dirigase a la seccion de Sesiones.',
              noOkButton: 'Cerrar'
            }
          };
        }

        this.openDialog(dialogConfig);
      } else {
        this.router.navigate(['session']);
      }
    }
  }
}
