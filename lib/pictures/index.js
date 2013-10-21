/**
 * node stdlib
 */
var fs = require('fs')
  , crypt = require('crypto');

/**
 * app wide config
 */
var config = require('../../config');

/**
 * external deps & config
 */
var express = require('express')
  , mongoose = require('mongoose')
  , aws = require('aws-sdk')
  , async = require('async');

mongoose.connect('mongodb://'
  + config.db.user
  + ((config.db.password) ? ':'+config.db.password : '')
  + ((config.db.user) ? '@' : '')
  + config.db.host
  + ":"+config.db.port
  + "/"+config.db.dbname);

aws.config.update(config.aws.s3);
var s3 = new aws.S3();

/**
 * db models
 */
var image = require('./models/image');

/**
 * server
 */
var app = module.exports = express();

app.use(express.bodyParser({
  uploadDir: __dirname+'/tmp'
}));

/**
 * routes
 */
app.get('/pictures/:id', function (req, res) {
  if(!req.params.id) {
    res.json(500, {error: "GET /pictures/:id requires an id"});
  }

  image.findOne({_id: req.params.id.toString()}, function (err, img) {
    if(err) {
      res.json(500, err);
    } else if (!img) {
      res.json(404);
    } else {
      img.totalCount += 1;
      img.save();
      s3.getObject({
        Bucket: config.aws.s3.bucket,
        Key: req.params.id
      },function (err, data) {
        if(err) {
          res.json(500, err);
        } else {
          res.end('data:'+img.type+';base64,'+data.Body.toString('base64'));
        }
      });
    }
  });
});

app.post('/pictures', function (req, res) {
  if(!req.files.image) {
    res.json(500, {error: "POST /pictures requires posted an image file"});
  } else {
    var tasks = [];
    var f = req.files.image;

    fs.readFile(f.path, function (err, data) {
      if(err) {
        err.from="ReadFile";
        res.json(500, err);
      }
      var i = new image();
      i.name = f.name;
      i.type = f.type;
      i.size = f.size;
      i.lastModified = f.lastModified;
      i.save(function (err) {
        s3.putObject({
          ACL: 'private',
          ContentType: f.type,
          Body: data.toString(),
          Bucket: config.aws.s3.bucket,
          Key: i._id.toString()
        }, function (err, data) {
          if(err) {
            err.obj=i;
            err.from="putObject";
            res.json(500, err);
          } else {
            res.json(200, i);
          }
        });
      });
    });
  }
});