define(
    [
        'app/classes/base/container',
    ],
    function (Container) {

        // TODO Возможно layout должен знать id модуля, к которому он принадлежит

        var Module = Container.extend({
        });

        return Module;
    }
);