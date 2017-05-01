const express = require('express')
const app = express()
const port = 8185

app.get('/', function(req, res){

  res.sendFile(__dirname + '/index.html');
})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log('server is listening on port 8185')
})
