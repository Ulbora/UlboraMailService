var assert = require('assert');
var db = require("../../../database/mysql/db");
var key;

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

