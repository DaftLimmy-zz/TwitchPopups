var hotseatIsOn = false;
var hotSeatUser = "";

actionHandlers['!hotseat'] = {
    security: (context) => {
        return context.mod || (context["badges-raw"] != null && context["badges-raw"].startsWith("broadcaster"))
    },
    handle: (commandName) => {
        hotSeatIsOn = true;
        $("#popupbox").show();
        hotSeatUser = commandName.substr(10).toLowerCase();
        $("#popupbox").css({"background-color":hotseatBg}); 
        $("#popuptext").text(`${hotseatEmoji} ${hotSeatUser.toUpperCase()} IS IN THE HOTSEAT ${hotseatEmoji}`);
        doAnimation();
    }
};


allHandlers.push({
    security: (context) => {
        return hotseatIsOn && context.username === hotSeatUser && (!commandName.startsWith('@') || commandName.startsWith('@' + twitchChannel))
    },
    handler: (commandName) => {
        $("#popuptext").text(`${hotseatEmoji} ${context['display-name']}: ${commandName} ${hotseatEmoji}`);
        doHotseatAnimation();
    }
});