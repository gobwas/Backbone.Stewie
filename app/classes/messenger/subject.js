/**
 * Subject.
 * 
 * @package module
 * @author Sergey Kamardin <s.kamardin@tcsbank.ru>
 */
define(
    [
        "app/classes/messenger/observers",
    ],
    function(Observers) {
        var Subject = function Subject() {
            this.observers = new Observers();
        };

        Subject.prototype = {
            constructor: Subject,

            observe: function(observer) {
                // todo assert observer instanceof Observer
                this.observers.add(observer)
            },

            notify: function(message) {
                this.observers.each(function(observer) {
                    observer.update(message);
                });
            }
        };

        Subject.extend = Backbone.Model.extend;

        return Subject;
    }
);