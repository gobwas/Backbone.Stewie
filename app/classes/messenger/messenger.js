/**
 * MessageDispatcher.
 * 
 * @package module
 * @author Sergey Kamardin <s.kamardin@tcsbank.ru>
 */
define(
    [
        "app/classes/messenger/observer",
        "app/classes/messenger/subject",
        "app/classes/messenger/message",
    ],
    function(Observer, Subject, Message) {
        var MessageDispatcher = function MessageDispatcher(module) {

            // Mixin of subject and observer
            Observer.prototype.constructor.apply(this, arguments);
            Subject.prototype.constructor.apply(this, arguments);

            var _lastBubbledId = null;

            var _modules = [];

            this.module = module;

            this.register = function(module) {
                module.messenger.observe(this);
                _modules.push(module);
            };

            this.observe = function(observer) {
                this.observers.add(observer);
            };

            this.bubble = function(message) {
                if (_lastBubbledId !== message.getId() && message.isBubbleable()) {
                    _lastBubbledId = message.getId();
                    this.notify(message);
                }
            };

            this.capture = function(message) {
                // TODO assert message instanceof Message
                // TODO assert message.getData instanceof Array

                if (message.isCapturable()) {
                    if (!_.isEmpty(_modules)) {
                        _.each(_modules, function(module) {
                            module.messenger.update(message)
                        });
                    } else {
                        message.setDirection(Message.BUBBLE);
                        this.bubble(message);
                    }
                }
            };
        };

        _.extend(MessageDispatcher.prototype, Observer.prototype, Subject.prototype, {
            constructor: MessageDispatcher,

            update: function(message) {
                // todo assert message instanceof Message
                this.module.update(message);

                if (message.getDirection() == Message.CAPTURE) {
                    this.capture(message);
                } else {
                    this.bubble(message);
                }
            },

            send: function(message) {
                message.setDirection(Message.CAPTURE);
                message.setId(_.uniqueId('message_'));

                this.capture(message);
            }
        });

        MessageDispatcher.CAPTURE = 'capture';

        return MessageDispatcher;
    }
);