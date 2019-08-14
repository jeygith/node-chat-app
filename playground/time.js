var moment = require('moment');

var date = moment();

date.add(1, 'year').subtract(12, 'months')


console.log(date.format('MMM Do, YYYY'));

console.log(date.format('H:mm a'))