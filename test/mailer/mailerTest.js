var assert = require('assert');
var db = require("../../database/db");
var mailer = require("../../mailer/mailer");
var server;
var testEmails;
describe('mysql DB', function () {
    this.timeout(20000);

    describe('#connect()', function () {
        it('should connect to db and create pool', function (done) {
            db.connect("localhost", "admin", "admin", "ulbora_mail_service", 5);
            setTimeout(function () {
                done();
            }, 1000);
        });
    });

    describe('#getMailServer()', function () {
        it('should get MailServer in db', function (done) {
            setTimeout(function () {
                var clientId = 1;
                db.getMailServer(clientId, function (result) {
                    console.log("mail server: " + JSON.stringify(result));
                    if (result && result.success) {
                        server = result.mailServer;
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
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
        it('should send text Mail', function (done) {
            setTimeout(function () {
                var body = {
                    toEmail: testEmails.toEmail,
                    fromEmail: testEmails.fromEmail,
                    subject: "test",
                    text: "test"
                };
                mailer.sendMail(body, server, function (result) {
                    console.log("TestEmail: " + JSON.stringify(result));
                    if (result && result.success) {                        
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
        it('should send html Mail', function (done) {
            setTimeout(function () {
                var html = "<!doctype html>" +
                        "<html>" +
                        "<head>" +
                        "</head>" +
                        "<body>" +
                        "<div>" +
                        "<h3>Copyright (C) 2016 Ulbora Labs LLC. (www.ulboralabs.com)</h3>" +
                        "<h3>All rights reserved.</h3>" +
                        "</div>" +
                        "</body>" +
                        "</html>";
                var body = {
                    toEmail: testEmails.toEmail,
                    fromEmail: testEmails.fromEmail,
                    subject: "test html mail",
                    html: html
                };
                mailer.sendMail(body, server, function (result) {
                    console.log("TestEmail: " + JSON.stringify(result));
                    if (result && result.success) {                        
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });

});

