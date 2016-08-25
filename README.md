![Travis](https://travis-ci.org/workingmandead/CI-project.svg?branch=master)
# lucid-web-redirects

lucid-web-redirects allows the user to put all of their redirects into a JSON file and this package will perform the redirect.

After the app is created place this line of code to use this package  
  
```javascript
var appredirects = require('lucid-web-redirects')(app);**
```

**This package requires a file named redirects.json to be placed in the root directory of your website.**

Here is a JSON example:  

{  
    "redirects": [  
        {  
            "url": "http://localhost:5000/redirect",  
            "redirectToUrl": "http://localhost:5000/test1/about/?test=1",  
            "matchType": "absolute",  
            "httpStatusCode": "302"  
	},  
        {  
            "url": "http://localhost:5000/redirect6",  
            "redirectToUrl": "http://localhost:5000/books6",  
            "matchType": "absolute",  
            "httpStatusCode": "302"  
	},  
        {  
            "url": "/redirect2",  
            "redirectToUrl": "/books2",  
            "matchType": "relative",  
            "httpStatusCode": "302"  
	},  
        {  
            "url": "\*redirect3\*",  
            "redirectToUrl": "/books3",  
            "matchType": "wildcard",  
            "httpStatusCode": "302"  
	},  
        {  
            "url": "http://localhost:5000/redirect4*",  
            "redirectToUrl": "/books4",  
            "matchType": "wildcard",  
            "httpStatusCode": "302"  
	},  
        {  
            "url": "\*redirect5",  
            "redirectToUrl": "/books5",  
            "matchType": "wildcard",  
            "httpStatusCode": "302"  
	},  
        {  
            "url": "",  
            "redirectToUrl": "/books7",  
            "matchType": "regex",  
            "httpStatusCode": "302",  
            "regex": "regextest$",  
            "regexFlags": "g,i"  
	}  
]}  



## JSON Definition:  
  
**redirects** - All redirects are placed into the redirects array   
**URL** - The URL you want to redirect away from.  Not required if using the regex matchtype  
**redirectToURL** - The URL you want the user to be redirected too  
**matchType**- matchType can be one of the following four options  
  
* *absolute* - This is an exact match of the whole URL.  

For example http://www.test.com will match http://www.test.com but not  https://www.test.com (https).  
  
* -*relative* -  This is an exact match of the relative URL.  

For example if you set url:"/mypage" it will match against http://www.test.com/mypage 
but /mypage will not match against http://www.test.com/mypage/about  
  
* *wildcard* -  A wildcard match can be used in 3 different ways. Place the wildcard string in the url field.  
 
Place a \* at the beginning of your string. It will match anything at the ends with the specified string  
Example - url: "\*medical" will match http://www.lilly.com/medical but will not match http://www.lilly.com/medical/diabetes  

Place a \* at the end of your string.  It will match anything at the start of your specified string  
Example - url: "http://www.test.com/medical\*" will match http://www.test.com/medical/mynewpage but will not match http://www.test.com/ous/medical  

Place a \* at the beginning and end of your string and it will match anything with the specified string in it.  
Example - url: "\*medical\*" will match both http://www.lilly.com/medical/newpage and match http://www.test.com/medical/  
  
* *regex* - A regex match type allows the user to add their own regex.  The url field can be left blank if using this match type.  
  
**httpStatusCode** - Enter the HTTP response here.  Common HTTP redirect status codes are 301 and 302  
  
**regex** - If using the regex match type place your regular expression here.  Do not include "/" on the beginning or end of the regular expression.    
  
**regexFlags** - If using the regex match type place your regular expression flags here.  See JSON example to see how this is implemented.  
