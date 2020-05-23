// !hotseat [@username]: will display the chat of the specified user from that point on
var hotSeatUser = "";

actionHandlers['!hotseat'] = {
    security: (context, textContent) => {
        return context.mod || (context["badges-raw"] != null && context["badges-raw"].startsWith("broadcaster"))
    },
    handle: (context, textContent) => {
        hotSeatUser = textContent.substr(10).toLowerCase();
        popup.showText(`${hotseatEmoji} ${hotSeatUser.toUpperCase()} IS IN THE HOTSEAT ${hotseatEmoji}`, hotseatBg);
    }
};

// This handler is fired when the hotseated user types something in chat
allHandlers.push({
    security: (context, textContent) => {
        return context.username === hotSeatUser && (!textContent.startsWith('@') || textContent.startsWith('@' + twitchChannel))
    },
    handle: (context, textContent) => {
        const formattedText = popup.formatEmotes(textContent, context.emotes, true);
        popup.showText(`${hotseatEmoji} ${context['display-name']}: ${formattedText} ${hotseatEmoji}`, hotseatBg);
    }
});