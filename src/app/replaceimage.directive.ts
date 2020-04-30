import { Directive, Input, HostBinding } from '@angular/core';

@Directive({
  selector: '[appReplaceImage]',
  host: {
    '(error)': 'updateUrl()',
    '[src]': 'src'
  }
})
export class ReplaceImageDirective {
  @Input() src:string;
  @HostBinding('class') className;

  constructor() { }

  updateUrl() {
    this.src = 'assets/default.jpg';
    this.className = 'placeholder-img';
  }
}
