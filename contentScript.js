// Call jquery.min to the page
// to insure it is available for the
// ajax call
var js = document.createElement('script');
// TODO: add "jquery.min.js" to web_accessible_resources in manifest.json
js.src = chrome.extension.getURL('jquery.min.js');
js.onload = function() {
    this.parentNode.removeChild(this);
};
(document.head||document.documentElement).appendChild(js);

// Call script file
var s = document.createElement('script');
// TODO: add "script.js" to web_accessible_resources in manifest.json
s.src = chrome.extension.getURL('script.js');
s.onload = function() {
    this.parentNode.removeChild(this);
};
(document.head||document.documentElement).appendChild(s);

// Call CSS file
var link = document.createElement("link");
link.href = chrome.extension.getURL("style.css");
link.type = "text/css";
link.rel = "stylesheet";
document.getElementsByTagName("head")[0].appendChild(link);