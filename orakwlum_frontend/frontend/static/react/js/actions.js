(function(Reflux, global) {
    'use strict';

    // Each action is like an event channel for one specific event. Actions are called by components.
    // The store is listening to all actions, and the components in turn are listening to the store.
    // Thus the flow is: User interaction -> component calls action -> store reacts and triggers -> components update

    global.RuleActions = Reflux.createActions([
        "toggleItem",     // called by button in RuleItem
        "toggleAllItems", // called by button in RuleMain (even though you'd think RuleHeader)
        "addItem",        // called by hitting enter in field in RuleHeader
        "removeItem",     // called by button in RuleItem
        "clearCompleted", // called by button in RuleFooter
        "editItem"        // called by finishing edit in RuleItem
    ]);

})(window.Reflux, window);
