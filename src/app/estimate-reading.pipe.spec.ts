import { EstimateReadingPipe } from './estimate-reading.pipe';

describe('EstimateReadingPipe', () => {

  let article = "Richard Drew/AP\r\n<ul><li>Goldman Sachs filed to create a new type of exchange-traded fund that wouldn't disclose its holdings on a daily basis.</li><li>The Goldman Sachs Multi-Asset Income ETF would invest across US stocks, American depository receipts, maste… [+2696 chars]";

  it('create an instance', () => {
    const pipe = new EstimateReadingPipe();
    expect(pipe).toBeTruthy();
  });


  it('convert character count to reading duration', () => {
    const pipe = new EstimateReadingPipe();
    
    expect(pipe.charsToMins(6000)).toEqual(5);
  });

  it('set minutes to one when estimate is less than 1', () => {
    const pipe = new EstimateReadingPipe();
    expect(pipe.charsToMins(39)).toEqual(1);
  });

  it('show previewed article text', () => {
    const pipe = new EstimateReadingPipe();
    let articleContent = "Richard Drew/AP\r\n<ul><li>Goldman Sachs filed to create a new type of exchange-traded fund that wouldn't disclose its holdings on a daily basis.</li><li>The Goldman Sachs Multi-Asset Income ETF would invest across US stocks, American depository receipts, maste";
    expect(pipe.getClippedContent(article)).toMatch(articleContent);

  });

  it('separate additional information', () => {
    const pipe = new EstimateReadingPipe();
    let additionalInformation = "[+2696 chars]";
    expect(pipe.getAdditionalCharInformation(article)).toMatch(additionalInformation);
  });

  it('extract numbers', () => {
    const pipe = new EstimateReadingPipe();
    let additionalChars = '2696';
    expect(pipe.getAdditionalCharCount('[+2696]')).toMatch(additionalChars);
  })

  
});
