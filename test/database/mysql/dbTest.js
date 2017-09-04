var assert = require('assert');
var db = require("../../../database/mysql/db");
var key;
var serverId;
describe('mysql DB role', function () {
    this.timeout(20000);

    describe('#connect()', function () {
        it('should connect to db and create pool', function (done) {
            db.connect("localhost", "admin", "admin", "ulbora_mail_service", 5);
            db.testConnection(function (success) {
                if (success) {
                    assert(true);
                } else {
                    assert(false);
                }
                done();
            });
        });
    });
    
    
    describe('#addMailServer()', function () {
        it('should add a email server in mysql db', function (done) {           
            var json = {                
                mailServer: "mail.some.com",
                secureConnection: true,
                port: "465",
                debug: true,
                username: "bob",
                password: "bob",
                fromAddress: "bob@bob.com",
                clientId: 1
                
            };
            setTimeout(function () {
                db.setMailServer(json, function (result) {
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
        it('should update an email server in mysql db', function (done) {           
            var json = {   
                id: serverId,
                mailServer: "mail.someother.com",
                secureConnection: true,
                port: "465",
                debug: true,
                username: "bobby",
                password: "bob",
                fromAddress: "bob@bob1.com",
                clientId: 1
                
            };
            setTimeout(function () {
                db.updateMailServer(json, function (result) {
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
        it('should get MailServer in mysql db', function (done) {
            setTimeout(function () {
                var clientId = 1;
                db.getMailServer(clientId, function (result) {
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
    
    describe('#getTestEmail()', function () {
        it('should get TestEmail in mysql db', function (done) {
            setTimeout(function () {                
                db.getTestEmail(function (result) {
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

