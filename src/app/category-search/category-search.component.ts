import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-category-search',
  templateUrl: './category-search.component.html',
  styleUrls: ['./category-search.component.scss']
})
export class CategorySearchComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
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

}
