var http = require('http');
var fs = require('fs');
AWS = require('aws-sdk');
mongoose = require('mongoose');
var Schema = mongoose.Schema;
var credentials = new AWS.SharedIniFileCredentials({
    profile: 'default'
});

AWS.config.credentials = credentials;
// AWS.config.update({region: 'us-west-2'});
// Express import
var express = require('express');
var app = express();
port = process.env.PORT || 3000;

databaseUrl = 'mongodb://localhost:27017/awsdb';
// Mongoose import
mongoose = require('mongoose');
// Mongo import
mongo = require('mongodb');
//CORS Module
app.use(require('./CORS'));
//S3 bucket connection
currentCollection = "";

var s3 = require('./parse/scheduler');


// Start mongoose and mongo
mongoose.connect(databaseUrl, function(error) {
    if (error) {
        console.log(error);
    }
});
var db = mongoose.connection;
db.on("open", function() {
    console.log("mongodb is connected!!");

    serviceSchema = new Schema({
        ProductName : {type : String},
        OS : {type : String, default : null},// (pricingJSON.config.regions[region].instanceTypes[compType].sizes[size].valueColumns[0]['name']);
        Region : {type : String, required : true}, // (pricingJSON.config.regions[region]['region']);
        TierName : { type : String},
        InstanceSize : { type : String},
        TypeName : {type : String, required : true}, //(pricingJSON.config.regions[region].instanceTypes[compType].sizes[size]['size'])
        Price : {type : Number, required : true},//(pricingJSON.config.regions[region].instanceTypes[compType].sizes[size].valueColumns[0].prices.USD);
        DateModified : {type: Date, default : Date()}, //Date field added for insert reference
        StorageType : { type : String}
    });
    billingSchema = new mongoose.Schema({
        _id: mongoose.Schema.ObjectId,
        ProductName: String,
        Cost: Number,
        ResourceId: String,
        UsageStartDate: Date,
        "user:Volume Id": String,
        Rate: Number,
        UsageType: String,
        ItemDescription: String,
        UsageQuantity: Number,
        RateId: Number,
        NonFreeRate: Number

    });
    latestSchema = new mongoose.Schema({
        _id: mongoose.Schema.ObjectId,
        time: String
    });
    instanceSchema = new mongoose.Schema({
        Id: String,
        State: String,
        ImageId: String,
        KeyName: String,
        Type: String,
        LaunchTime: String,
        Zone: String,
        Lifetime: Number,
        LastActiveTime: String,
        Email: String,
        VolumeId: Array
    });
    ec2metricsSchema = new mongoose.Schema({
        InstanceId: String,
        NetworkIn: Number,
        NetworkOut: Number,
        CPUUtilization: Number,
        Time: String
    });
    var Instances = mongoose.model('Instances', instanceSchema, 'instances');
    var Ec2Metrics = mongoose.model('Ec2Metrics', ec2metricsSchema, 'ec2metrics');
    var pricingModel = mongoose.model('pricingModel', serviceSchema, 'pricing');

    //TODO:
    // var pricingSchema = new mongoose.Schema({})
    //Pricing data check
    
    s3.s3Connect(function() {
        var latestTime = mongoose.model('currentCollection', latestSchema, 'latest');
        mongoose.model('currentCollection').find([{}]).exec(function(e, d) {
            var Billings = mongoose.model('Billings', billingSchema, currentCollection);
        });
        require('./BoxPricingCheck').updateFreeTier();
    });
});
if (!fs.existsSync(process.cwd() + '/data')) {
    fs.mkdirSync(process.cwd() + '/data');
}

app.get('/api/instances', require('./route/instanceRoute'));

app.get('/api/metrics', require('./route/metricsRoute'));

app.get('/api/billing/totalCostProduct', require('./Route/billingRoute').totalCostProduct);
app.get('/api/billing/hourlyCostProduct', require('./Route/billingRoute').hourlyCostProduct);

app.get('/api/billing/instanceCostAll', require('./Route/billingRoute').instanceCostAll);

app.get('/api/billing/calcFreeTierCost', require('./Route/billingRoute').calcFreeTierCost);


function errorHandler(err, req, res, next) {
    console.error(err.message);
    console.error(err.stack);
    res.status(500);
    res.render('error_template', {
        error: err
    });
}
module.exports = errorHandler;

app.listen(port);
console.log('server started on port %s', port);
