module.exports = function (app) {
  var images = require('./images')(app);

  app.post('/images/new', images.upload);
  app.get('/images/view/:id/:size', images.view);

  app.all('*', function (req, res) {
    res.json(500, {message: "Please use a valid endpoint. Thank you :)"});
  })
}