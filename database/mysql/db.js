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

var atob = require('atob'); //base64 to json
var btoa = require('btoa');
var mysql = require('mysql');
var pool;
exports.connect = function (host, user, pw, db, cpnum) {
    pool = mysql.createPool({
        connectionLimit: cpnum,
        host: host,
        user: user,
        password: pw,
        database: db
    });
};

exports.testConnection = function (callback) {
    var rtn = false;
    pool.getConnection(function (err, connection) {
        if (!err && connection) {
            connection.release();
            rtn = true;
        }
        callback(rtn);
    });
};


exports.getMailServer = function (clientId, callback) {
    var rtn = {
        success: false,
        mailServer: null
    };
    var serverQuery = " select * " +
            " from mail_server " +
            " where client_id = ? ";
    var args = [clientId];

    pool.query(serverQuery, args, function (err, result) {
        if (!err && result) {
           //console.log("found data: " + JSON.stringify(result));
            if (result && result.length > 0) {
                rtn.success = true;
                var s = result[0];
                var server = {};
                server.id = s.id;
                server.mailServer = s.mail_server;
                server.secureConnection = (s.secure_connection === 1) ? true : false;
                server.port = s.port;
                server.debug = (s.debug === 1) ? true : false;
                server.username = s.username;
                server.password = atob(s.password.toString());
                server.fromAddress = s.from_address;
                server.clientId = s.client_id;
                rtn.mailServer = server;
            }
            callback(rtn);
        } else {
            console.error("Database get error: " + JSON.stringify(err));
            rtn.message = "Database get failed";
            callback(rtn);
        }
    });
};

exports.setMailServer = function (json, callback) {
    var rtn = {
        success: false        
    };
    var serverQuery = "INSERT INTO mail_server Set ?";
    var args = {
        mail_server: json.mailServer,
        secure_connection: json.secureConnection,
        port: json.port,
        debug: json.debug,
        username: json.username,
        password: btoa(json.password),
        from_address: json.fromAddress,
        client_id: json.clientId
    };
    pool.query(serverQuery, args, function (err, result) {
        //console.log("result in add server: " + JSON.stringify(result));
        if (!err && result.insertId) {
            rtn.id = result.insertId;
            rtn.success = true;
            callback(rtn);
        } else {
            console.error("Database Insert error: " + JSON.stringify(err));
            rtn.message = "Database Insert failed.";
            callback(rtn);
        }
    });

};


exports.updateMailServer = function (json, callback) {
    var rtn = {
        success: false
    };
    json.password = btoa(json.password);
    
    var serverQuery = "UPDATE mail_server SET mail_server = ?, secure_connection = ?, port = ?, " +
                      "debug = ?, username = ?, password = ?, from_address = ? " +
                      "where id = ? and client_id = ? ";
    var args = [
        json.mailServer,
        json.secureConnection,
        json.port,
        json.debug,
        json.username,
        json.password,
        json.fromAddress,
        json.id,
        json.clientId
    ];
    pool.query(serverQuery, args, function (err, result) {
        //console.log("result in update server: " + JSON.stringify(result));
        if (!err) {
            rtn.success = true;
            callback(rtn);
        } else {
            console.error("Database Insert error: " + JSON.stringify(err));
            rtn.message = "Database Insert failed.";
            callback(rtn);
        }
    });

};

exports.getTestEmail = function (callback) {
    var rtn = {
        success: false,
        toEmail: null,
        fromEmail: null
    };
    var emailQuery = " select * " +
            " from test_table ";

    pool.query(emailQuery, function (err, result) {
        if (!err && result) {
            //console.log("found data: " + JSON.stringify(result));
            if (result && result.length > 0) {
                rtn.success = true;
                rtn.toEmail = result[0].to_email;
                rtn.fromEmail = result[0].from_email;
            }
            callback(rtn);
        } else {
            console.error("Database get error: " + JSON.stringify(err));
            rtn.message = "Database get failed";
            callback(rtn);
        }
    });
};