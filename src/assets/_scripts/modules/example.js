/**
* @file example - test related JavaScript
*/
var siteObj = siteObj ? siteObj : {};

(function() {
    siteObj.example = {
        exampleString: 'a string',

        privateFunction: function() {
            var self = this;
            console.log(this.exampleString);
        },

        init: function () {
            var self = this;
            self.privateFunction();
        }
    };
}());

