import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {

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

  getCategory(category: string) {
    let navigationExtras = {
      queryParams: {
        "type": "category",
        "query": category,
        "endpoint": "top-headlines"
      }
    };
    this.router.navigate(['results'], navigationExtras);
  }

  getSource(source: string) {
    let navigationExtras = {
      queryParams: {
        "type": 'source',
        "query": source,
        "endpoint": "top-headlines"
      }
    };
    this.router.navigate(['results'], navigationExtras);
  }

  addClass(classes: DOMTokenList[], className: string) {

    classes.forEach(function(c) {
      if (!c.contains(className)) {
      c.add(className);
      }
    });
  }

  removeClass(classes: DOMTokenList[], className: string) {
    classes.forEach(function(c) {
      if (c.contains(className)) {
      c.remove(className);
      }
    });
  }

  colorSwitch(selectedMethod: string) {
    let keyword = document.getElementById('keyword').classList;
    let category = document.getElementById('category').classList;
    let source = document.getElementById('source').classList;

    let keywordSearch = document.getElementById('keyword-search').classList;
    let categorySearch = document.getElementById('category-search').classList;
    let sourceSearch = document.getElementById('source-search').classList;

    switch(selectedMethod) {
      case 'keyword':
        this.addClass([keyword], 'pink');
        this.removeClass([category, source], 'pink');

        this.removeClass([keywordSearch], 'hidden');
        this.addClass([categorySearch, sourceSearch], 'hidden');
        
        if (!(keywordSearch).contains('hidden')) {
          document.getElementById('search').focus();
        }
        break;
      case 'category':
        this.addClass([category], 'pink');
        this.removeClass([keyword, source], 'pink');
        
        this.removeClass([categorySearch], 'hidden');
        this.addClass([keywordSearch, sourceSearch], 'hidden');
        break;
      case 'source':
        this.addClass([source], 'pink');
        this.removeClass([keyword, category], 'pink');

        this.removeClass([sourceSearch], 'hidden');
        this.addClass([keywordSearch, categorySearch], 'hidden');
        break;
      default:
        break;
    }
  }
}
