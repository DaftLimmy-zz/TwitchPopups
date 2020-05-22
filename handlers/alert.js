// !alert: will display whatever text comes after the !alert command
actionHandlers['!alert'] = {
    security: (context) => {
        return context.mod || (context["badges-raw"] != null && context["badges-raw"].startsWith("broadcaster"))
    },
    handle: (commandName) => {
        $("#popupbox").show();
        $("#popupbox").css({ "background-color": alertBg });
        $("#popuptext").text(commandName.substr(7).toUpperCase());
        doAnimation();
    }
};