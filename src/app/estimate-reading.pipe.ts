import { Pipe, PipeTransform, ɵCompiler_compileModuleSync__POST_R3__ } from '@angular/core';
// import { ConsoleReporter } from 'jasmine';
import { getLocaleNumberSymbol } from '@angular/common';

@Pipe({
  name: 'estimateReading'
})
export class EstimateReadingPipe implements PipeTransform {

  transform(content: string): any {

    if (content) {
        var charCount: number;
        if(content.includes('chars]')) {
          charCount = this.getClippedContent(content).length + this.getAdditionalCharCount(content);
        } else {
          charCount = content.length;
        }
        return this.charsToMins(charCount) + ' mins';
    } else {
      return 'unknown'
    }
  }

  charsToMins(charCount: number): any {
    let words = charCount / 6;
    let root = words / 200;
    let minutes = Math.floor(root);
    let seconds = root % 1;
    let rounded = Math.round(seconds * 0.6);
    return (minutes + rounded) > 1 ? minutes + rounded : 1;
  }
  
  getClippedContent(content: string): any {
    var diff = content.length - this.getAdditionalCharInformation(content).length;
    return content.substring(0, diff);
  }


  getAdditionalCharInformation(content: string): any {
    return content.substring(content.lastIndexOf('['), content.lastIndexOf(']')+1);
  }

  getAdditionalCharCount(content: string): any {
    return parseInt(this.getAdditionalCharInformation(content).match(/\d+/g)[0]);
  }


}
