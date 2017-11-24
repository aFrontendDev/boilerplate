/**
* @file _init - initiate JS modules on page ready JavaScript
*/
var siteObj = siteObj ? siteObj : {};

siteObj.pageReady = function(callback) {
  if (document.readyState !== 'loading') {
    callback();
  } else {
    document.addEventListener('DOMContentLoaded', function(event) {
      callback(event);
    });
  }
}

siteObj.pageLoaded = function(callback) {
  document.addEventListener('load', function(event) {
    callback(event);
  });
}

siteObj.pageReady(function() {
  console.log('1');
  siteObj.example.init();
});