const [,, arg] = process.argv

const request = require('request-promise').defaults({ jar: true });
const $ = require('cheerio');
const url = {
    uri: "https://codequiz.azurewebsites.net",
    headers: {
        Cookie: `hasCookie=true`
    }
};

request(url)
  .then(function(html) {
    const rows = [] ;   
    for (let i = 2; i <= 4; i++) {
        const val = {
            name: $(`tr:nth-child(${i}) > td:nth-child(1)`, html).text().trim(),
            data: $(`tr:nth-child(${i}) > td:nth-child(2)`, html).text(),
        }
        rows.push(val);
    }
    const result = rows.find(row => row.name === arg);
    console.log(result.data);
  })
  .catch(function(err) {
    //handle error
  });