import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { ResultsComponent } from './results/results.component';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }

  search(url: string) {
    return from(fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          return data;
        }));
    }
}
