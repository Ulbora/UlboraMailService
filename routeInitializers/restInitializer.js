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



var service = require("../services/service");

exports.init = function(app, db){
    //init
    service.init(db);    
    
    // challenge      
    app.post('/rs/mail/send', service.sendMail);
    app.post('/rs/mailServer/add', service.addMailServer);
    app.put('/rs/mailServer/update', service.updateMailServer);
    app.get('/rs/mailServer/get', service.getMailServer);
};
