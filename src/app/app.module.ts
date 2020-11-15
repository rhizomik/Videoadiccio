import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { SessionComponent } from './pages/session/session.component';
import { SlideshowComponent } from './components/slideshow/slideshow.component';
import { HistoricalSessionComponent } from './components/historical-session/historical-session.component';
import { HistoryRelationsComponent } from './pages/history-relations/history-relations.component';
import { DialogBoxComponent } from './components/dialog-box/dialog-box.component';
import { HistorySessionsComponent } from './pages/history-sessions/history-sessions.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    SessionComponent,
    SlideshowComponent,
    HistoricalSessionComponent,
    HistoryRelationsComponent,
    DialogBoxComponent,
    HistorySessionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    DragDropModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  entryComponents: [
    DialogBoxComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
