// This delete command resets the whole pop up system
actionHandlers['!delete'] = {
    security: (context) => {
        return context.mod || (context["badges-raw"] != null && context["badges-raw"].startsWith("broadcaster"))
    },
    handle: (commandName) => {
        deleteAnimation();
    }
};