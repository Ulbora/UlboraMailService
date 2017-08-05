/*     
 Copyright (C) 2016 Ulbora Labs Inc. (www.ulboralabs.com)
 All rights reserved.
 
 Copyright (C) 2016 Ken Williamson
 All rights reserved.
 
 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License as published
 by the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.
 
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.
 
 You should have received a copy of the GNU Affero General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */


var db;
var mailManager = require("../managers/mailManager");
var constants = require("../constants/constants");
var oauth2 = require("ulbora-oauth2");

var validationUrl = process.env.OAUTH2_VALIDATION_URI || constants.OAUTH2_VALIDATION_URI;
exports.init = function (database) {
    db = database;
    mailManager.init(db);
};



exports.sendMail = function (req, res) {
    if (req.is('application/json')) {
        var me = {
            role: "admin",
            uri: "/rs/mail/send",
            scope: "write"
        };
        oauth2.authorize(req, res, me, validationUrl, function () {
            var reqBody = req.body;
            reqBody.clientId = req.header("clientId");
            var bodyJson = JSON.stringify(reqBody);
            console.log("body: " + bodyJson);
            mailManager.sendMail(reqBody, function (result) {
                res.send(result);
            });
        });
    } else {
        res.status(415);
        res.send({success: false});
    }
};


exports.getClientId = function (clientIdStr) {
    var clientId;
    if (clientIdStr) {
        try {
            clientId = parseInt(clientIdStr);
        } catch (err) {
            clientId = clientIdStr;
        }
    } else {
        clientId = clientIdStr;
    }
    return clientId;
};
