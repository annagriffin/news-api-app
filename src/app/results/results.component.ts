
import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import { ActivatedRoute } from "@angular/router";
import { DatePipe } from '@angular/common';
import { FilterPipe } from '../filter.pipe';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  providers: [DatePipe, FilterPipe]
})
export class ResultsComponent implements OnInit {

  baseUrl = 'https://newsapi.org/v2/';
  params = 'pageSize=50&';
  apiKey = 'apiKey=' + environment.apiKey;
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
        this.params += 'language=en&';
    });

    if (this.searchType == 'category') {
      this.params += 'country=us&';
    }

    let request = `${this.baseUrl}${this.endpoint}?${this.params}${this.searchType}=${this.query}&${this.apiKey}`;
    this.searchService.search(request).subscribe((result) => {
      this.articles = result["articles"];
      this.filteredArticles = this.articles;
    });

    this.date = this.getDate();

  }

  /**
   * Get the date in a readable format for display purposes
   * @returns string with the date and time of the search
   */
  getDate() {
    let currentDate = new Date();
    let formattedDate = this.datePipe.transform(currentDate, 'fullDate');
    let formattedTime = this.datePipe.transform(currentDate, 'mediumTime');
    return formattedDate + ' ' + formattedTime;
  }

  /**
   * Filters out articles that were published before selected date
   */
  filter(timeInterval: string) {
    let endDate = this.getEndDate(timeInterval);
    this.filteredArticles = this.filterPipe.transform(this.articles, endDate);
  }


  /**
   * Get oldest date in user selected range
   */
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
    newDate.setHours(0,0,0,0);
    return newDate;
  }
}
