import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {

searchTypes;

  constructor() { }

  ngOnInit() {
    this.searchTypes = {
      'keyword': false,
      'category': true,
      'source': true
    }
  }

  /**
   * Toggle pick color that highlights which search method was chosen
   */
  toggle(category: string) {
    let beforeAll =  {
      'keyword': true,
      'category': true,
      'source': true
    }
    beforeAll[category] = false;
    this.searchTypes = beforeAll;
  }

}
