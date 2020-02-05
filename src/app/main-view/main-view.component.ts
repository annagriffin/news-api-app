import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {

searchTypes;
type;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.type = params['type'];
      
    });

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
