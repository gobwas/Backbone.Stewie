/**
 * Observer.
 * 
 * @package module
 * @author Sergey Kamardin <s.kamardin@tcsbank.ru>
 */
define(
    [
    ],
    function() {
        var Observer = function Observer() {

        };

        Observer.prototype = {
            constructor: Observer,

            update: function() {}
        };

        Observer.extend = Backbone.Model.extend;

        return Observer;
    }
);