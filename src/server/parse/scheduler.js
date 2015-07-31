//scheduler is timed hourly to parse metrics, bills from aws and check for budget timeouts

var fs = require("fs");
var adm = require('adm-zip');
var billingParser = require('./billingParse');
var ec2Parser = require('./ec2Parse');
var rdsParser = require('./rdsParse');
var iamParser = require('./iamParse');
var timeOutHandler = require('../BudgetTimeOutHandler');
var grlsParser = require('./grlsParse');
var self = this;
var okey,next_okey;
var s3 = new AWS.S3();
var _params = {
    Bucket: s3Bucket
};

exports.s3Connect = function(_callback) {
    // require('../route/timeBudgetRoute').createGRLSInstances({
    //     "TimeBudgetName": "budget2",
    //     "BatchType": "user",
    //     "BatchName": "deepak",
    //     "StartDate": "2015-07-01 00:00:00",
    //     "EndDate": "2015-07-30 23:00:00",
    //     "TimeAmount": "150",
    //     "TimeOut": "true",
    //     "uDecayRate": 3,
    //     "oDecayRate": 2,
    //     "dBConnections": 20,
    //     "State": "valid"
    // });
    // require('../route/timeBudgetRoute').createGRLSInstances({
    //     "TimeBudgetName" : "sefa",
    // "BatchType" : "group",
    // "BatchName" : "awsDelegator",
    // "StartDate" : "2015-07-01 00:00:00",
    // "EndDate" : "2015-07-28 23:00:00",
    // "TimeAmount" : "123",
    // "TimeOut" : "true",
    // "uDecayRate" : 3,
    // "oDecayRate" : 2,
    // "dBConnections" : 20,
    // "State" : "valid"   
    // });
    printBanner(); 
    // s3.s3Watch();
    // parseBills();
    // AWS.config.credentials = awsCredentials.default;
    // parseAWSServices();
    timeOutHandler.checkBudgets();
    grlsParser.updateTimeBudgets();
};

var parseBills = function() {
    console.log('ParseAlert(bills): billing parse initiated');
    deleteLatestBills(function(){
        getOkey(function(){
            getBillingCSV(function(){
                renameCSV(function(){
                    parseBillings(function(){
                        console.log('ParseAlert(bills): billing parse completed');
                    });
                });
            });
        });
    });
}

var printBanner = function() {
    var currentTimeMilliseconds = (new Date).getTime();
    var currentTimeIso = new Date(currentTimeMilliseconds).toISOString();
    console.log("     ___      _____ ___      _               _           ");
    console.log("    /_\\ \\    / / __|   \\ ___| |___ __ _ __ _| |_ ___ _ _ ");
    console.log("   / _ \\ \\/\\/ /\\__ \\ |) / -_) / -_) _` / _` |  _/ _ \\ '_|");
    console.log("  /_/ \\_\\_/\\_/ |___/___/\\___|_\\___\\__, \\__,_|\\__\\___/_|  ");
    console.log("       "+currentTimeIso+"    |___/                  \n");
}

var parseAWSServices = function() {
    console.log('ParseAlert(ec2): parsing initiated');
    parseEC2(function() {
        console.log('ParseAlert(ec2): parsing completed');
        console.log('ParseAlert(rds): parsing initiated');
        parseRDS(function() {
            console.log('ParseAlert(rds): parsing completed');
            console.log('ParseAlert(iam): parsing initiated');
            parseIAM(function() {
                console.log('ParseAlert(iam): parsing completed');
            });
        })
    });
}

var deleteLatestBills = function(callback){
    fs.readdir(process.cwd() +'/data/', function(err, files) {
        if (err) throw err;
        var latestBillsindex = files.indexOf('latestBills.csv');
        if (latestBillsindex != -1) {
            try {
                fs.unlink(process.cwd() + '/data/' + files[latestBillsindex], function(unlink_err) {
                    if (unlink_err) throw unlink_err;
                    callback();
                });
            } catch (err) {
                throw err;
            }
        }else
            callback();       
    });
}

var getOkey = function(callback){
    mongoose.model('latest').find({}, function(e, d) {
        //get currentBillingCollection from 'latest' collection
        if (e) throw e;
        //time: yyyy-mm-dd hh:mm:ss
        var latestTime = d[0].time;
        latestTime.substring(0, latestTime.indexOf(' '));
        var time = latestTime.split('-');
        currentBillingCollection = 'bills' + time[0] + time[1];
        var year, nextYear, month, nextMonth;
        year = parseInt(time[0]);
        month = parseInt(time[1]);
        if (month == 12) {
            nextYear = year + 1;
            nextMonth = 1;
        } else {
            nextYear = year;
            nextMonth = month + 1;
        }
        if (nextMonth < 10) {
            nextMonth = '0' + String(nextMonth);
            nextYear = String(nextYear);
        } else {
            nextMonth = String(nextMonth);
            nextYear = String(nextYear);
        }
        okey = awsAccountNumber + '-aws-billing-detailed-line-items-with-resources-and-tags-' + time[0] + '-' + time[1] + '.csv.zip';
        next_okey = awsAccountNumber + '-aws-billing-detailed-line-items-with-resources-and-tags-' + nextYear + '-' + nextMonth + '.csv.zip';
        callback();
    });
}

var getBillingCSV = function(callback){
    AWS.config.region = s3Region;
    s3.listObjects(_params, function(err, data) {
        if (err) throw err;
        for (var i in data.Contents) {
            if (data.Contents[i].Key == next_okey) {
                okey = next_okey;
            }
        }
        var params = {
            Bucket: s3Bucket,
            Key: okey
        };
        var datasheet = fs.createWriteStream('datasheet.zip');
        s3.getObject(params).createReadStream().pipe(datasheet);
        datasheet.on('close', function() {
            var unzip = new adm('datasheet.zip');
            try {
                unzip.extractAllTo("data", true);
                callback();
            } catch (e) {
                console.log(e);
            }    
        });
    });
}

var renameCSV = function(callback){
    fs.readdir(process.cwd() + '/data/', function(err, files) {
        if (err) throw err;
        fs.rename(process.cwd() + '/data/' + files[0], process.cwd() + '/data/latestBills.csv', function(err) {
            if (err) console.log('ERROR: ' + err);
            console.log('billingCsv:',files[0]);
            callback();
        });        
    });
}

var parseBillings = function(callback){
    billingParser.parseBillingCSV(function() {        
        callback();
    });
}

var parseEC2 = function(callback) {
    //Parse 'metrics' before 'instances' as new instances 
    ec2Parser.parseMetrics('scheduler', function() {        
        ec2Parser.parseInstances(function() {            
            callback();
        });
    });
}

var parseRDS = function(callback) {
    //Parse 'metrics' before 'instances' as new instances    
    rdsParser.parseMetrics('scheduler', function() {         
        rdsParser.parseInstances(function() {            
            callback();
        });
    });
}

var parseIAM = function(callback){    
    iamParser.parseGroups(function(){
        iamParser.parseUsers(function(){
            iamParser.parseUserGroups(function(){
                callback();
            });    
        });
    });
}

s3.s3Watch = function() {
    console.log("Watching s3 bucket on timer of 60 minutes");
    setTimeout(self.s3Connect.bind(self), 1000 * 60 * 60);
        // setTimeout(self.s3Connect.bind(self), 1000);

};

exports.updateAWSRegion = function(newRegion) {
    AWS.config.update({
        region: newRegion
    });
    console.log("new awsRegion " + AWS.config.region);
};