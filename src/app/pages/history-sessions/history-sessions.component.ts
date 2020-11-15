import { Router } from '@angular/router';
import { SessionInfo } from './../../models/sessionInfo.model';
import { Component, OnInit } from '@angular/core';
import { StorageService } from './../../services/storage.service';
import { DialogBoxComponent } from 'src/app/components/dialog-box/dialog-box.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-history-sessions',
  templateUrl: './history-sessions.component.html',
  styleUrls: ['./history-sessions.component.css']
})
export class HistorySessionsComponent implements OnInit {

  title = 'Concienciamiento de los factores implicados en la videodicción';
  pendingSessions: SessionInfo[];
  finishSessions: SessionInfo[];

  constructor(private storageService: StorageService,
              private router: Router,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.pendingSessions = this.storageService.getPendingSessions();
    this.finishSessions = this.storageService.getFinishSessions();
  }

  resumeSession(sessionInfo: SessionInfo): void {
    this.storageService.setSessionInfo(sessionInfo);
    this.router.navigate(['session']);
  }

  viewHistory(sessionInfo: SessionInfo): void {
    this.storageService.setSessionInfo(sessionInfo);
    this.router.navigate(['session/history']);
  }

  deleteDialog(sessionInfo: SessionInfo, flag: boolean): void {
      const dialogRef = this.dialog.open(DialogBoxComponent, {
      disableClose: true,
      data: {
        title: 'Borrar sesión',
        message: '¿Esta seguro que quiere borrar la sesión?',
        okButton: 'Aceptar',
        noOkButton: 'Cancelar'
      }
      });

      dialogRef.afterClosed().subscribe(res => {
        if (res) {
          this.deleteSession(sessionInfo, flag);
        }
      });
  }

  deleteSession(sessionInfo: SessionInfo, flag: boolean): void {

    this.storageService.deleteSession(sessionInfo.key);

    if (flag) {
      const index = this.pendingSessions.indexOf(sessionInfo);
      this.pendingSessions.splice(index, 1);
    } else {
      const index = this.finishSessions.indexOf(sessionInfo);
      this.finishSessions.splice(index, 1);
    }

  }

}
