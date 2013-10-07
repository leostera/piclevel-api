module.exports = function (app) {
  var mongoose = require('mongoose');
  var amazonS3 = require('awssum-amazon-s3');

  var Image = require('../models/image');

  var s3 = new amazonS3.S3({
    'accessKeyId'     : app.get('s3').key,
    'secretAccessKey' : app.get('s3').secret,
    'region'          : amazonS3.US_EAST_1,
  });

  /*
   * GET users listing.
   */
  
  return {
    view: function(req, res){
      if(!req.params.id) {
        res.json(500, {message: "/view requries an id."});
      } else {
        // increment counters
        Image.findOne({hash: req.params.id}, function (error, img) {
          if(error || !img) {
            res.json(500, {message: "Image not found", hash: req.params.id});
          } else {
            img.totalCount = img.totalCount+1;
            img.save();
            // s3.list
            // if !regex img.hash_req.params.size 
            //    create img
            //    s3.put
            // return img
            res.json(200, img);
          }
        })
      }
    },

    upload: function (req, res) {
      // upload an image using s3
      res.json(200, req.body);
    }
  };

}
