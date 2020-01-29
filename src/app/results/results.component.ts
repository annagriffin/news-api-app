
import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import { ActivatedRoute } from "@angular/router";
import { DatePipe } from '@angular/common';
import { FilterPipe } from '../filter.pipe';
import * as process from 'process';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  providers: [DatePipe, FilterPipe]
})
export class ResultsComponent implements OnInit {

  baseUrl = 'https://newsapi.org/v2/';
  params = 'pageSize=50&';
  apiKey =  'apiKey=' + process.env.API_KEY;
  query: string;
  results: object;
  searchType: string;
  endpoint: string;
  country: string;

  constructor(private searchService: SearchService, private activatedRoute: ActivatedRoute, private datePipe: DatePipe, private filterPipe: FilterPipe) { }
  articles: object[];
  filteredArticles: object[];
  date: string;
  sources: object[];

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {

        this.query = params["query"];
        this.searchType = params["type"];
        this.endpoint = params["endpoint"];
    });

    if (this.searchType == 'category') {
      this.params += 'country=us&';
    }

    let request = `${this.baseUrl}${this.endpoint}?${this.params}${this.searchType}=${this.query}&${this.apiKey}`;
    this.searchService.search(request).subscribe((result) => {
      this.articles = result["articles"];
      this.filteredArticles = this.articles;
    });

    this.getSources();

    this.date = this.getDate();

  }


  getSources() {
    let base = 'https://newsapi.org/v2/sources?apiKey=a952fcbd49a34cb08c80b12729935005';
    this.searchService.search(base).subscribe((result) => {

      this.sources = result["sources"].filter((source) => {
        if (source["country"] == 'us') {
          return source;
        }
      });
    });
  }


  getDate() {
    let currentDate = new Date();
    let formattedDate = this.datePipe.transform(currentDate, 'fullDate');
    let formattedTime = this.datePipe.transform(currentDate, 'mediumTime');
    return formattedDate + ' ' + formattedTime;
  }

  filter(timeInterval: string) {
    let endDate = this.getEndDate(timeInterval);
    this.filteredArticles = this.filterPipe.transform(this.articles, endDate);
  }


  getEndDate(filterStr: string) {

    let newDate = new Date();
    switch(filterStr) {
      case 'all':
        // same as month with developer account - only retrieves articles up to
        // one month old
        newDate.setMonth(newDate.getMonth() - 1);
        break;
      case 'three':
        newDate.setDate(newDate.getDate() - 3);
        break;
      case 'week':
        newDate.setDate(newDate.getDate() - 7);
        break;
      case 'month':
        newDate.setMonth(newDate.getMonth() - 1);
        break;
      default:
        break;
    }
    return newDate;
  }
}
