var request = require("request");
var fs = require("fs");
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var databaseUrl = 'mongodb://localhost:27017/awsdb';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var freeTier = require('./FreeTier');
// mongoose.connect(databaseUrl);

var region = 0; //us-east-1
var compType = 0; //generalCompute
var size = 0 //micro



//ADD URLS as AMAZON CHANGES THIER protocols
var boxPricingURLs = ["http://a0.awsstatic.com/pricing/1/ec2/linux-od.min.js",
    "http://a0.awsstatic.com/pricing/1/ec2/rhel-od.min.js", "http://a0.awsstatic.com/pricing/1/ec2/sles-od.min.js",
    "http://a0.awsstatic.com/pricing/1/ec2/mswin-od.min.js", "http://a0.awsstatic.com/pricing/1/ec2/mswinSQLWeb-od.min.js"
];

//MANY RDS values available...This will do for now though.
var rdsPricingURL = 'http://a0.awsstatic.com/pricing/1/rds/mysql/pricing-standard-deployments.min.js';
//Up to date as of June 8... Add exec/unix command ability to repopulate these URLS dynamically...
// curl http://aws.amazon.com/<ec2>/pricing/ 2>/dev/null | grep 'model:' | sed -e "s/.*'\(.*\)'.*/http:\\1/"
var s3PricingURL = ['http://a0.awsstatic.com/pricing/1/s3/pricing-storage-s3.min.js',
    'http://a0.awsstatic.com/pricing/1/s3/pricing-requests-s3.min.js'
];
// 'http://a0.awsstatic.com/pricing/1/s3/pricing-data-transfer-s3.min.js'];

var GP2PricingURL = 'http://a0.awsstatic.com/pricing/1/rds/oracle/pricing-li-standard-deployments.min.js'
var EBSPricingURL = 'http://a0.awsstatic.com/pricing/1/ebs/pricing-ebs.min.js';
//No Micro instances supported with EC2 optimized... 
var dataPricingURL = 'http://a0.awsstatic.com/pricing/1/ec2/pricing-data-transfer-with-regions.min.js';

var pricingModel = mongoose.model('pricingModel');
exports.updateFreeTier = function() {
    var databaseLength = 13;
    var db = mongoose.connection;
    pricingModel.find([{}]).exec(function(e, d) {
        if (e) throw e;
        console.log("Length", d.length);
        //include additional check for currentCollection be
        if (d.length == 0) {
            console.log("Pricing collection Not created yet");
            console.log("Getting values")
            getPricing(function(err, ret) {
                if (err) throw err;
                // freeTier.CheckFreeTier();
            });
        }
        if (d.length != databaseLength && d.length != 0) {
            console.log("SOMETHING WRONG WITH PRICING DATA. Dropping data ");
            db.collections('pricing').drop( function(err){
                console.log("Pricing collection dropped");
            });
            getPricing(function(err, ret) {
                if (err) throw err;
                else{
                    // freeTier.CheckFreeTier();
                }
            });
        }
        if (d.length == databaseLength) {
            console.log(d.length,' Pricing docs. Pricing collection already created.');
            // freeTier.CheckFreeTier();
        }
        setTimeout(function(){
            freeTier.CheckFreeTier();
            console.log("NonFreeRates have been appended to the currentCollection");
        },1000);
    });

}

getPricing = function() {
    var usage = pricingModel;
    MongoClient.connect(databaseUrl, function(err, db) {
        if (err) {
            console.log('Pricing -- Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Pricing --- Connection established to ', databaseUrl);
        }
        for (var i = 0; i < boxPricingURLs.length; i++) {
            request({
                    uri: boxPricingURLs[i],
                },
                function(error, response, body) {
                    body = body.substring(body.indexOf("callback") + 9, body.length - 2);
                    pricingJSON = JSON.parse(preprocessJSON(body));
                    var item = usage();
                    item.OS = (pricingJSON.config.regions[region].instanceTypes[compType].sizes[size].valueColumns[0]['name']);
                    item.Region = (pricingJSON.config.regions[region]['region']);
                    item.InstanceSize = (pricingJSON.config.regions[region].instanceTypes[compType].sizes[size]['size']);
                    item.Price = (pricingJSON.config.regions[region].instanceTypes[compType].sizes[size].valueColumns[0].prices.USD);
                    db.collection("pricing").insert((item.toObject()));
                });
        }
        request({
                uri: rdsPricingURL
            },
            function(error, response, body) {
                body = body.substring(body.indexOf("callback") + 9, body.length - 2);
                pricingJSON = JSON.parse(preprocessJSON(body));
                var item = usage();
                item.Region = (pricingJSON.config.regions[region]['region']);
                item.ProductName = "Amazon RDS Service";
                item.TierName = (pricingJSON.config.regions[region].types[0].tiers[0].name);
                item.Price = (pricingJSON.config.regions[region].types[0].tiers[0].prices.USD);
                db.collection("pricing").insert((item.toObject()));
            });
        request({
                uri: s3PricingURL[0],
            },
            function(error, response, body) {
                body = body.substring(body.indexOf("callback") + 9, body.length - 2);
                pricingJSON = JSON.parse(preprocessJSON(body));
                var item = usage();
                item.ProductName = 'Amazon Simple Storage Service';
                item.Region = (pricingJSON.config.regions[region]['region']);
                item.TierName = (pricingJSON.config.regions[region].tiers[0].name);
                item.StorageType = (pricingJSON.config.regions[region].tiers[0].storageTypes[0].type);
                item.Price = (pricingJSON.config.regions[region].tiers[0].storageTypes[0].prices.USD);;
                db.collection("pricing").insert((item.toObject()));
            });

        request({
                uri: dataPricingURL,
            },
            function(error, response, body) {
                body = body.substring(body.indexOf("callback") + 9, body.length - 2);
                pricingJSON = JSON.parse(preprocessJSON(body));
                var item = usage();
                item.Region = (pricingJSON.config.regions[region]['region']);
                item.TypeName = pricingJSON.config.regions[region].types[1].name;
                item.TierName = (pricingJSON.config.regions[region].types[1].tiers[5].name);
                item.Price = (pricingJSON.config.regions[region].types[1].tiers[5].prices.USD);

                db.collection("pricing").insert((item.toObject()));
            });
        request({
                uri: EBSPricingURL,
            },

            function(error, response, body) {
                body = body.substring(body.indexOf("callback") + 9, body.length - 2);
                pricingJSON = JSON.parse(preprocessJSON(body));
                var item = usage();
                item.Region = (pricingJSON.config.regions[region]['region']);
                item.TypeName = pricingJSON.config.regions[region].types[0].name;
                item.Price = pricingJSON.config.regions[region].types[0].values[0].prices.USD;
                db.collection("pricing").insert((item.toObject()));
            });

        request({
                uri: s3PricingURL[1],
            },

            function(error, response, body) {
                body = body.substring(body.indexOf("callback") + 9, body.length - 2);
                pricingJSON = JSON.parse(preprocessJSON(body));
                var item = usage();
                item.Region = (pricingJSON.config.regions[region]['region']);
                item.TierName = pricingJSON.config.regions[region].tiers[0].name;
                item.Price = pricingJSON.config.regions[region].tiers[0].prices.USD;
                db.collection("pricing").insert((item.toObject()));
            });

        request({
                uri: s3PricingURL[1],
            },

            function(error, response, body) {
                body = body.substring(body.indexOf("callback") + 9, body.length - 2);
                pricingJSON = JSON.parse(preprocessJSON(body));
                var item = usage();
                item.Region = (pricingJSON.config.regions[region]['region']);
                item.TierName = pricingJSON.config.regions[region].tiers[3].name;
                item.Price = pricingJSON.config.regions[region].tiers[3].prices.USD;
                db.collection("pricing").insert((item.toObject()));
            });

        request({
                uri: GP2PricingURL,
            },

            function(error, response, body) {
                body = body.substring(body.indexOf("callback") + 9, body.length - 2);
                pricingJSON = JSON.parse(preprocessJSON(body));
                var item = usage();
                item.Region = (pricingJSON.config.regions[region]['region']);
                item.TierName = pricingJSON.config.regions[region].types[0].tiers[1].name;
                item.Price = pricingJSON.config.regions[region].types[0].tiers[1].prices.USD;
                db.collection("pricing").insert((item.toObject()));
            });

        request({
                uri: dataPricingURL,
            },
            function(error, response, body) {
                body = body.substring(body.indexOf("callback") + 9, body.length - 2);
                pricingJSON = JSON.parse(preprocessJSON(body));
                var item = usage();
                item.Region = (pricingJSON.config.regions[region]['region']);
                item.TypeName = pricingJSON.config.regions[region].types[2].name;
                item.TierName = pricingJSON.config.regions[region].types[2].tiers[1].name;
                item.Price = pricingJSON.config.regions[region].types[2].tiers[1].prices.USD;
                db.collection("pricing").insert((item.toObject()));
            });

    });
}

function preprocessJSON(str) {
    return str.replace(/("(\\.|[^"])*"|'(\\.|[^'])*')|(\w+)\s*:/g,
        function(all, string, strDouble, strSingle, jsonLabel) {
            if (jsonLabel) {
                return '"' + jsonLabel + '": ';
            }
            return all;
        });
};