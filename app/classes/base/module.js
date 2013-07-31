define(
    [
        'app/classes/base/container',
    ],
    function (Container) {

        // TODO Возможно layout должен знать id модуля, к которому он принадлежит

        var Module = Container.extend({
            constructor: function Module(options) {

                // parent call
                Container.prototype.constructor.apply(this, arguments);

                var _options = options || {};

                this.options = _.cloneDeep(_options);

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