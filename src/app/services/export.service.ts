import { SessionInfo } from 'src/app/models/sessionInfo.model';
import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor() { }

  exportSessionsToExcel(sessions: SessionInfo[]): void {
    const workbook = new Workbook();

    const worksheet = workbook.addWorksheet('Sesiones');

    const header = worksheet.addRow(['Usuario', 'Juego', 'Hook', 'Risk', 'Catalyst']);
    header.font = { size: 12 , bold: true, color: { argb: 'FFFFFFFF' } };
    header.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };

    header.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF000000' },
        bgColor: { argb: 'FF0000FF' }
      };
    });

    worksheet.columns.forEach( column => {
      column.width = 40;
    });

    sessions.forEach(session => {
      session.historyRelations.forEach(relation => {
        const content = worksheet.addRow(
          [session.user, session.game, relation.hook.name, relation.risc.name, relation.catalyst.name]
        );
        content.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
      });
    });

    workbook.xlsx.writeBuffer().then(
      data => {
        const blob = new Blob(
          [data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        fs.saveAs(blob, 'data-sessions.xlsx');
      }
    );
  }
}
