define(
    [],
    function () {
        var Region = function() {
            this.modules = [];
        };

        Region.prototype = {
            constructor: Region,

            push: function(module) {
                // TODO assert(module instanceof Component)
                this.modules.push(module);
            },

            render: function(element) {
                // TODO assert element instance of DOMElement

                _.each(this.modules, function(module) {
                    element.append(module.render().layout.el);
                });
            },
        };

        Region.extend = Backbone.Model.extend;

        return Region;
    }
);