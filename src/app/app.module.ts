import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainViewComponent } from './main-view/main-view.component';
import { ResultsComponent } from './results/results.component';
import { EstimateReadingPipe } from './estimate-reading.pipe';
import { FilterPipe } from './filter.pipe';
import { KeywordSearchComponent } from './keyword-search/keyword-search.component';
import { CategorySearchComponent } from './category-search/category-search.component';
import { SourceSearchComponent } from './source-search/source-search.component';
import { ReplaceImageDirective } from './replaceimage.directive';


@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent,
    ResultsComponent,
    EstimateReadingPipe,
    FilterPipe,
    KeywordSearchComponent,
    CategorySearchComponent,
    SourceSearchComponent,
    ReplaceImageDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
