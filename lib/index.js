var url = require('url');
var fs = require('fs');
var objRedirectJSON = {};
/*
fs.readFile('redirects.json', 'utf8', function (err, data) {
    
    if (err) { console.log("1");
        console.log("redirects.json does not exist or JSON is malformed");
       objRedirectJSON=JSON.parse('{ "redirects": []}');
              console.log('--------------JSON is loaded 1--------------');
    }
    else {
       
         objRedirectJSON = JSON.parse(data);
              console.log('--------------JSON is loaded 2--------------');
    }
   
});

*/
//var objRedirectJSON = JSON.parse(fs.readFileSync('redirects.json', 'utf8'));

try {
    objRedirectJSON = JSON.parse(fs.readFileSync('redirects.json', 'utf8'));

} catch (e) {
    console.log("redirects.json does not exist or JSON is malformed");
    objRedirectJSON = JSON.parse('{ "redirects": []}');
}


module.exports = function (app) {


    app.use('*', function (req, res, next) {

        //request URL
        var reqFullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        reqFullUrl = reqFullUrl.toString().trim().toLowerCase()
        var reqRelURL = req.originalUrl.toString().trim().toLowerCase();

        var jsonRedirectURL = ""; // holds value of redirect URL from json
        var jsonURL = ""; //hold value of request URL from json
  

        // Loop through JSON redirects   
        for (var i = 0; i < objRedirectJSON['redirects'].length; i++) {
            jsonURL = objRedirectJSON['redirects'][i].url.toString().trim()
            jsonRedirectURL = objRedirectJSON['redirects'][i].redirectToUrl.toString().trim();
            jsonStatusCode = parseInt(objRedirectJSON['redirects'][i].httpStatusCode);
            jsonMatchType = objRedirectJSON['redirects'][i].matchType.toString().trim()

            //     console.log("json URL-" + jsonURL + " -----  reqRelURL-" + reqRelURL);
            if (jsonMatchType == "absolute") {
                if (jsonURL == reqFullUrl) {

                    doRedirect(jsonStatusCode, jsonRedirectURL);
                }
            } else if (jsonMatchType == "relative") {
                if (jsonURL == reqRelURL) {

                    doRedirect(jsonStatusCode, jsonRedirectURL);
                }

            } else if (jsonMatchType == "wildcard") {

                var fchar = jsonURL.charAt(0);
                var lchar = jsonURL.charAt(jsonURL.length - 1);
                var myRegEx = "";

                if (fchar == "*" && lchar == "*") {
                    myRegEx = jsonURL.substring(1, jsonURL.length - 1);

                } else if (fchar == "*") {
                    myRegEx = jsonURL.substring(1, jsonURL.length)
                    myRegEx = myRegEx + "$"

                } else if (lchar == "*") {
                    myRegEx = jsonURL.substring(0, jsonURL.length - 1)
                    myRegEx = "^" + myRegEx
                }


                if (testRegEx(myRegEx, reqFullUrl)) {
                    doRedirect(jsonStatusCode, jsonRedirectURL);
                }

            } else if (jsonMatchType == "regex") {
                jsonregex = objRedirectJSON['redirects'][i].regex.toString().trim()
                jsonRegexFlags = objRedirectJSON['redirects'][i].regexFlags.toString().trim()
                if (testRegEx(jsonregex, reqFullUrl, jsonRegexFlags)) {
                    doRedirect(jsonStatusCode, jsonRedirectURL);
                }

            }


        }

        function doRedirect(httpStatus, redirectURL) {
            res.redirect(httpStatus, redirectURL);
          
        }

        next();
    });

}

function testRegEx(re, strToTest, flags) {
    var regex = new RegExp(re)
    if (typeof flags === 'undefined') {
        flags = '';
    }

    if (flags = '') {
        return (regex.test(strToTest))
    } else {

        return (regex.test(strToTest, flags))
    }

}
