/**
 * Observers.
 * 
 * @package module
 * @author Sergey Kamardin <s.kamardin@tcsbank.ru>
 */
define(
    [
    ],
    function() {
        var Observers = function Observers() {
            this.empty();
        };

        Observers.prototype = {
            constructor: Observers,

            add: function(observer) {
                // todo assert observer instance of observer

                this.list.push(observer);
            },

            empty: function() {
                this.list = [];
            },

            each: function(iterator) {
                _.each(this.list, iterator);
            }
        };

        return Observers;
    }
);
