// server.js

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/timestamp/:date?', function(req, res) {
  let outputDate = new Date(req.params.date);

  if(req.params.date === undefined) {
    //if url date param is empty
    outputDate = new Date();
  } else if(outputDate == 'Invalid Date') {
    //if url date param is invalid try to parse unix
    outputDate = new Date(parseInt(req.params.date));
    //if not valid unix num it will return null / invalid
  }

  //js object for the json output
  let outputObj = {
    unix: outputDate.getTime(),
    utc: outputDate.toUTCString()
  };
  res.json(outputObj);
});


// listen for requests :)
var listener = app.listen(3000, function () {
console.log('Server Running...');
});
