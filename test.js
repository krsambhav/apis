const binlist = require('./binlist.json')

const bin = '41746';

if(bin in binlist){
  console.log(binlist[bin]);
} else {
  console.log('Not Found In DB');
}