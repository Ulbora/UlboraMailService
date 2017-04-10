var assert = require('assert');
var db = require("../../database/db");
var service = require("../../services/service");
var key;
var tokenFile = require("./token");
var token = tokenFile.token;
var testEmails;
describe('service', function () {
    this.timeout(20000);
    describe('#init()', function () {
        it('should init service', function (done) {
            db.connect("localhost", "admin", "admin", "ulbora_mail_service", 5);
            setTimeout(function () {
                service.init(db);
                done();
            }, 1000);
        });
    });


    
    describe('#getTestEmail()', function () {
        it('should get TestEmail in mysql db', function (done) {
            setTimeout(function () {
                db.getTestEmail(function (result) {
                    console.log("TestEmail: " + JSON.stringify(result));
                    if (result && result.success) {
                        testEmails = result;
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });

    describe('#sendMail()', function () {
        it('should fail to sendMail because of expired token', function (done) {
            setTimeout(function () {
                var req = {};
                var header = function (val) {
                    if (val === "Authorization") {
                        return "Bearer " + token;
                    } else if (val === "userId") {
                        return undefined;
                    } else if (val === "clientId") {
                        return "403";
                    }
                };
                req.header = header;
                req.protocol = "https";
                req.hostname = "abc.com";
                req.body = {
                    toEmail: testEmails.toEmail,
                    fromEmail: testEmails.fromEmail,
                    subject: "test",
                    text: "test",
                    clientId: 1
                };
                req.is = function (val) {
                    console.log("is: " + val);
                    if (val === 'application/json') {
                        return true;
                    } else {
                        return false;
                    }
                };
                var res = {};
                res.statusCode;
                res.status = function (val) {
                    this.statusCode = val;
                    console.log("res status: " + val);
                };
                res.send = function (val) {
                    if (this.statusCode === 401) {
                        assert(true);
                    } else if (val && val.id) {
                        clientObj = val;
                        roleId = val.success;
                        console.log("sendMail reaponse: " + JSON.stringify(val));
                        assert(false);
                    } else {
                        assert(false);
                    }
                    done();
                };
                service.sendMail(req, res);
            }, 1000);
        });
    });


});


