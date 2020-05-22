//!hotseat [@username]: will display the chat of the specified user from that point on
var hotSeatUser = "";

actionHandlers['!hotseat'] = {
    security: (context, textContent) => {
        return context.mod || (context["badges-raw"] != null && context["badges-raw"].startsWith("broadcaster"))
    },
    handle: (context, textContent) => {
        $("#popupbox").show();
        hotSeatUser = textContent.substr(10).toLowerCase();
        $("#popupbox").css({ "background-color": hotseatBg });
        $("#popuptext").text(`${hotseatEmoji} ${hotSeatUser.toUpperCase()} IS IN THE HOTSEAT ${hotseatEmoji}`);
        doAnimation();
    }
};

// This handler is fired when the hotseated user types somthing in chat
allHandlers.push({
    security: (context, textContent) => {
        return context.username === hotSeatUser && (!textContent.startsWith('@') || textContent.startsWith('@' + twitchChannel))
    },
    handle: (context, textContent) => {
        $("#popuptext").text(`${hotseatEmoji} ${context['display-name']}: ${textContent} ${hotseatEmoji}`);
        doHotseatAnimation();
    }
});