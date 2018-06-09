var assert = require('assert');
var db = require("../../database/db");
var mailManager = require("../../managers/mailManager");
var testEmails;
var serverId;
describe('Mail Manager', function () {
    this.timeout(20000);
    describe('#init()', function () {
        it('should init manager', function (done) {
            db.connect("localhost", "admin", "admin", "ulbora_mail_service", 5);
            setTimeout(function () {
                mailManager.init(db);
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
        it('should sendMail text in manager', function (done) {
            var body = {
                toEmail: testEmails.toEmail,
                fromEmail: testEmails.fromEmail,
                subject: "test",
                text: "test",
                clientId: 403
            };
            setTimeout(function () {
                mailManager.sendMail(body, function (result) {
                    if (result.success) {
                        roleId = result.id;
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
        it('should sendMail html in manager', function (done) {
            
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
                html: html,
                clientId: 403
            };

            setTimeout(function () {
                mailManager.sendMail(body, function (result) {
                    if (result.success) {
                        roleId = result.id;
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
        it('should fail to send sendMail text in manager with bad clientId', function (done) {
            var body = {
                toEmail: testEmails.toEmail,
                fromEmail: testEmails.fromEmail,
                subject: "test",
                text: "test",
                clientId: 2
            };
            setTimeout(function () {
                mailManager.sendMail(body, function (result) {
                    if (result.success) {
                        roleId = result.id;
                        assert(false);
                    } else {
                        assert(true);
                    }
                    done();
                });
            }, 1000);
        });
    });
    
    
    describe('#addMailServer()', function () {
        it('should add a email server in manager', function (done) {           
            var json = {                
                mailServer: "mail.some.com",
                secureConnection: true,
                port: "465",
                debug: true,
                username: "bob",
                password: "bob",
                clientId: 2
                
            };
            setTimeout(function () {
                mailManager.setMailServer(json, function (result) {
                    console.log("mail server result: " + JSON.stringify(result));
                    if (result.id > -1) { 
                        serverId = result.id;
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });
    
    
    describe('#updateMailServer()', function () {
        it('should update an email server in manager', function (done) {           
            var json = {   
                id: serverId,
                mailServer: "mail.someother.com",
                secureConnection: true,
                port: "465",
                debug: true,
                username: "bobby",
                password: "bob",
                clientId: 2
                
            };
            setTimeout(function () {
                mailManager.updateMailServer(json, function (result) {
                    console.log("mail server update result: " + JSON.stringify(result));
                    if (result.success) {                          
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });
    
    
    
    describe('#getMailServer()', function () {
        it('should get MailServer in manager', function (done) {
            setTimeout(function () {
                var clientId = 2;
                mailManager.getMailServer(clientId, function (result) {
                    console.log("mail server: " + JSON.stringify(result));
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



