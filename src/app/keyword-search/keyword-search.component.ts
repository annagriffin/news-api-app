import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router'; 

@Component({
  selector: 'app-keyword-search',
  templateUrl: './keyword-search.component.html',
  styleUrls: ['./keyword-search.component.scss']
})
export class KeywordSearchComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onKeyDown(event: any) {
    if (event.keyCode === 13) {

      let navigationExtras = {
        queryParams: {
          "type": "q",
          "query": event.srcElement.value,
          "endpoint": 'everything'
        }
      };
      this.router.navigate(['results'], navigationExtras);
      }
  }

}
