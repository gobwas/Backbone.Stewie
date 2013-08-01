/**
 * Module.
 *
 * @package module
 * @author Sergey Kamardin <s.kamardin@tcsbank.ru>
 */
define(
    [
    ],
    function() {
        var inherit = function inherit(Parent, protoProps, staticProps) {
            var Child;

            protoProps || (protoProps = {});
            staticProps || (staticProps = {});

            if (protoProps.hasOwnProperty("constructor") && typeof protoProps.constructor === 'function') {
                Child = protoProps.constructor;
            } else {
                Child = function Child(){Parent.apply(this, arguments);};
            }

            // set the static props
            _.extend(Child, Parent, staticProps);

            // create prototype of Child, that created with Parent prototype
            // (without making Child.prototype = new Parent())
            //
            // __proto__  <----  __proto__
            //     ^                 ^
            //     |                 |
            //   Parent            Child
            //
            function Surrogate(){}
            Surrogate.prototype = Parent.prototype;
            Child.prototype = new Surrogate();

            // extend prototype
            _.extend(Child.prototype, protoProps, {constructor: Child});

            // link to Parent prototype
            Child.__super__ = Parent.prototype;

            return Child;
        };

        return inherit;
    }
);