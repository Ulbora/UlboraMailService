/*     
 Copyright (C) 2015 Driven Solutions (www.drivensolutions.com)
 All rights reserved.
 
 Copyright (C) 2015 Ken Williamson
 All rights reserved.
 Copyright (C) 2015 Chris Williamson
 All rights reserved.
 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.
 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
 
 
 Author: Ken Williamson (ken@ulboralabs.com) 
 */
var nodemailer = require('nodemailer');

exports.sendMail = function (reqBody, mailServer, callback) {
    //console.log("body: " + JSON.stringify(reqBody));
    //console.log("mailServer: " + JSON.stringify(mailServer));
    var rtn = {
        success: false,
        message: ""
    };
    var fromEmailAddress = reqBody.fromEmail;   
    if(fromEmailAddress === undefined || fromEmailAddress === null || fromEmailAddress === ""){
        fromEmailAddress = mailServer.fromAddress;
    }
    
    var toEmailAddress = reqBody.toEmail;
    if(toEmailAddress === undefined || toEmailAddress === null || toEmailAddress === ""){
        toEmailAddress = mailServer.fromAddress;
    }
    var subject = reqBody.subject;   
    var text;
    if(reqBody.text){
        text = reqBody.text;
    }
    var html;
    if(reqBody.html){
        html = reqBody.html;
    }
    
    createTransport(mailServer, function (transporter) {
        var mailOptions = {
            from: fromEmailAddress, // sender address
            to: toEmailAddress, // list of receivers
            subject: subject, // Subject line
            text: text,
            html: html // html body
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log("email error message:" + error);
                rtn.message = error;
                callback(rtn);
            } else {
                //console.log('Message sent: ' + info.response);
                rtn.success = true;
                callback(rtn);
            }
        });

    });

};


createTransport = function (mailServer, callback) {
    var tpOpt = {
        host: mailServer.mailServer, // hostname
        secureConnection: mailServer.secureConnection, // TLS requires secureConnection to be false
        port: mailServer.port, // port for secure SMTP
        debug: mailServer.debug,
        auth: {
            user: mailServer.username,
            pass: mailServer.password
        },
        tls: {
            rejectUnauthorized: false
        }
    };
    //console.log("mail server options: " + JSON.stringify(tpOpt));
    var transport = nodemailer.createTransport(tpOpt);
    callback(transport);

};
