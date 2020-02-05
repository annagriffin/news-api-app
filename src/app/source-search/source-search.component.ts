import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-source-search',
  templateUrl: './source-search.component.html',
  styleUrls: ['./source-search.component.scss']
})
export class SourceSearchComponent implements OnInit {

  sources: object[];

  constructor(private router: Router, private searchService: SearchService) { }

  ngOnInit() {
    this.getSources();
  }

  getSource(source: string) {
    let navigationExtras = {
      queryParams: {
        "type": 'sources',
        "query": source,
        "endpoint": "top-headlines"
      }
    };
    this.router.navigate(['results'], navigationExtras);
  }

  /**
   * API call to get all of the named sources that are from us news sources
   * and that are in English
   */
  getSources() {
    let base = 'https://newsapi.org/v2/sources?apiKey=a952fcbd49a34cb08c80b12729935005';
    this.searchService.search(base).subscribe((result) => {
      this.sources = result["sources"].filter((source) => {
        if (source["country"] == 'us' && source['language']=='en') {
          return source;
        }
      });
    });
  }
}
