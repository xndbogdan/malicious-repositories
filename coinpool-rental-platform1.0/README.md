We didnt find any potential security risk code, but at same time, there was a similar repository with fetch and eval loading a script on the browser.


According to [njsscan](https://github.com/ajinabraham/njsscan)

* OWASP-WEB   │ A1: Injection
```
File           │ server/controllers/paymentController.js
Line Number(s) │ 129
Match String   │ res.redirect(`https://${req.get("host")}/order/${body.orderId}`); │
```


* node_nosqli_injection
```
File           │ server/controllers/paymentController.js
Line Number(s) │ 151
Match String   │ const payment = await Payment.findOne({ orderId: req.params.id });
```


* node_nosqli_injection
```
File           │ server/controllers/userController.js
Line Number(s) │ 151
Match String   │  const user = await User.findOne({ email: req.body.email });
```
