// !alert: will display whatever text comes after the !alert command
actionHandlers['!alert'] = {
    security: (context, textContent) => {
        return context.mod || (context["badges-raw"] != null && context["badges-raw"].startsWith("broadcaster"))
    },
    handle: (context, textContent) => {
        $("#popupbox").show();
        $("#popupbox").css({ "background-color": alertBg });
        $("#popuptext").text(textContent.substr(7).toUpperCase());
        doAnimation();
    }
};