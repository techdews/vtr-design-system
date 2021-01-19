const fs = require('fs');
const path = require('path');
module.exports._writeInFile = function (baseTokeensJSON) {

  fs.writeFile(path.join(__dirname, '../', 'json', 'output.json'), JSON.stringify(baseTokeensJSON, 0, 2), function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });
}