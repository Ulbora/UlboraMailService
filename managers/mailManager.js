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

var manager = require("./manager");
var mailer = require("../mailer/mailer");

var db;

exports.init = function (database) {
    db = database;
};


exports.sendMail = function (json, callback) {
    var returnVal = {
        success: false,        
        message: ""
    };
    var server;
    var isOk = manager.securityCheck(json);
    if (isOk) {        
        db.getMailServer(json.clientId, function (serverResult) {
            console.log("serverResult in manager: " + JSON.stringify(serverResult));
            if (serverResult && serverResult.success) {
                server = serverResult.mailServer;
                delete json.clientId;
                mailer.sendMail(json, server, function (mailResult) {
                    if (mailResult && mailResult.success) {   
                        returnVal.success = true;
                    }else{
                        returnVal.message = mailResult.message;
                    }
                    callback(returnVal);
                });                
            } else {
                callback(returnVal);
            }
        });
    } else {
        callback(returnVal);
    }
};

