Ulbora Mail Service 
==============

A Mail Micro Service

## Sent Mail

```   
POST:
URL: http://localhost:3002/rs/sendMail
Example Text Request
{
   "toEmail":"someMail@some.com",
   "fromEmail":"someOther2some.com",
   "subject":"more test",
   "text":"this is a test",
   "clientId":1
}
   
  
```

```   
POST:
URL: http://localhost:3002/rs/sendMail
Example HTML Request
{
   "toEmail":"someMail@some.com",
   "fromEmail":"someOther2some.com",
   "subject":"more test",
   "html":"<!doctype html><html><head></head><body><div><h3>Copyright (C) 2016 Ulbora Labs LLC. (www.ulboralabs.com)</h3><h3>All rights reserved.</h3></div></body></html>",
   "clientId":1
}
   
  
```

```
Example Response   

{
    "success": true
}
  
```

