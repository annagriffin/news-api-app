import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainViewComponent } from './main-view/main-view.component';
import { ResultsComponent } from './results/results.component';
import { EstimateReadingPipe } from './estimate-reading.pipe';
import { FilterPipe } from './filter.pipe';

// declare var require: any;
// require('dotenv').config();

@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent,
    ResultsComponent,
    EstimateReadingPipe,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
