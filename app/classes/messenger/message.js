/**
 * Message.
 * 
 * @package module
 * @author Sergey Kamardin <s.kamardin@tcsbank.ru>
 */
define(
    [
    ],
    function() {
        var Message = function Message() {

            var _id = null,
                _bubble = true,
                _capture = true,
                _name = arguments[0],
                _data = _.toArray(arguments).slice(1),
                _direction = null;

            return {
                name: _name,
                getId: function() {
                    return _id;
                },
                setId: function(id) {
                    _id = id;
                    this.id = id;

                    return this;
                },
                isBubbleable: function() {
                    return _bubble;
                },
                isCapturable: function() {
                    return _capture;
                },
                getData: function() {
                    return _.cloneDeep(_data);
                },
                getName: function() {
                    return _name;
                },
                stopPropagation: function() {
                    _bubble = false;

                    return this;
                },
                setDirection: function(direction) {
                    _direction = direction;

                    return this;
                },
                getDirection: function() {
                    return _direction;
                }
            };
        };

        Message.prototype = {
            constructor: Message
        };

        Message.CAPTURE = 'capture';
        Message.BUBBLE = 'bubble';

        return Message;
    }
);