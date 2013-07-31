define(
    [
        'app/classes/base/container',
    ],
    function (Container) {

        // TODO Возможно layout должен знать id модуля, к которому он принадлежит

        var Module = Container.extend({
            constructor: function Module() {

                // parent call
                Container.prototype.constructor.apply(this, arguments);

                // Initialization
                // --------------

                if (this.constructor === Module || this.constructor.__super__.constructor === Module) {
                    this.initialize();
                }
            }
        });

        return Module;
    }
);