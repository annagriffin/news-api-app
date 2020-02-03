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
/**
 * Converts character count to estimated reading time (minutes)
 * @param charCount amount of characters in article content
 * @returns whole number of estimated minutes
 */
  charsToMins(charCount: number): any {
    let words = charCount / 6;
    let root = words / 200;
    let minutes = Math.floor(root);
    let seconds = root % 1;
    let rounded = Math.round(seconds * 0.6);
    return (minutes + rounded) > 1 ? minutes + rounded : 1;
  }
  
  /**
   * Gets the part of the content that is part of the article
   * @param content beginning of article and number of additional characters
   * @return substring that only contains content in the article
   */
  getClippedContent(content: string): any {
    var diff = content.length - this.getAdditionalCharInformation(content).length;
    return content.substring(0, diff);
  }

  /**
   * Gets the information at the end of the content that contains information about the rest
   * of the article that was over the 'preview' threshold 
   * @param content beginning of article and number of additional characters
   * @returns slice of the content string that is not part of the actual article
   */
  getAdditionalCharInformation(content: string): any {
    return content.substring(content.lastIndexOf('['), content.lastIndexOf(']')+1);
  }

    /**
   * Gets the additional character count at the end of the content preview
   * @param content beginning of article and number of additional characters 
   * @returns number of additional characters in the article
   */
  getAdditionalCharCount(content: string): any {
    return parseInt(this.getAdditionalCharInformation(content).match(/\d+/g)[0]);
  }


}
