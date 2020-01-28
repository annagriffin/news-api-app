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

  colorSwitch() {
    let keyword = document.getElementById('keyword');
    let category = document.getElementById('category');
    keyword.classList.toggle("pink");
    category.classList.toggle("pink");
    
    let keywordSearch = document.getElementById('keyword-search');
    let categorySearch = document.getElementById('category-search');
    keywordSearch.classList.toggle("hidden");
    categorySearch.classList.toggle("hidden");

  }


}
