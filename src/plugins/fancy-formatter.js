const FancyFormatter =  {
  QDTAmount(amount) {
    //let am = Number.parseFloat(amount)/(10**18)
    let am = amount
    if(am>=0 && am<999)
    {
      return am.toFixed(2)+'';
    } else if(am>=1000 && am<999999)
    {
      return (am/1000).toFixed(2)+'k';
    } else if(am>=1000000 && am<999999999)
    {
      return (am/1000000).toFixed(2)+'M';
    } else if(am>=1000000000 && am<999999999999)
    {
      return (am/1000000).toFixed(2)+'B';
    } else
    {
      return am.toFixed(2)+'';
    }
  },
  timestampToDate(timestampSec) {
    return (new Date(timestampSec*1000).toLocaleDateString())
  },
  txLink(explorer_base,tx_hash,classes="") {
    return `<a target="_blank" href="${explorer_base}/tx/${tx_hash}" class="classes">${tx_hash}</a>`;
  },
  blockLink(explorer_base,block_number,classes="") {
    return `<a target="_blank" href="${explorer_base}/block/${block_number}" class="classes">${block_number}</a>`;
  }
}

export default FancyFormatter;
