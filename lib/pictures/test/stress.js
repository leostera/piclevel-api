var request = require('request')
  , fs = require('fs')
  , path = require('path');

for (var i = 1; i <= 100; i++) {
  makeRequest(i);
}

function makeRequest (i) {
  console.log("Starting",i);
  var r = request.post('http://localhost:8080/pictures', function (res) {
    console.log("Finishing", i);
  });
  var form = r.form();
  form.append('image', fs.createReadStream(path.join(__dirname, 'leostera.png')));
}